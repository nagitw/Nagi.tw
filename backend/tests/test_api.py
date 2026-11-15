import json
import httpx
import pytest
from fastapi.testclient import TestClient
from app import create_app, Settings


def client(tmp_path, handler=None, **kwargs):
    knowledge = tmp_path / 'knowledge.json'
    knowledge.write_text(json.dumps([{'title':'About','description':'Public intro','url':'/about/','locale':'en','kind':'page'}]))
    async def default(request):
        return httpx.Response(200, text='{"message":{"content":"Hello"},"done":false}\n{"done":true}\n')
    return TestClient(create_app(Settings(knowledge_file=str(knowledge), **kwargs), httpx.MockTransport(handler or default)))


def test_stream_and_locale(tmp_path):
    def model(request):
        data = json.loads(request.content)
        assert data['options']['num_predict'] == 512
        assert 'Traditional Chinese' in data['messages'][0]['content']
        assert 'tools' not in data
        return httpx.Response(200, text='{"message":{"content":"你好"}}\n{"done":true}\n')
    with client(tmp_path, model) as c:
        r=c.post('/chat', json={'question':'Hi','locale':'zh'})
        assert r.status_code == 200
        assert [json.loads(x)['type'] for x in r.text.splitlines()] == ['delta','done']
        assert r.headers['cache-control']=='no-store'


def test_security(tmp_path):
    with client(tmp_path, rate_limit=2) as c:
        assert c.post('/chat',headers={'Origin':'https://evil.example'},json={'question':'Hi'}).status_code==403
        assert c.post('/chat',content=b'x'*9000,headers={'content-type':'application/json'}).status_code==413
        assert c.post('/chat',json={'question':'x'*1001}).status_code==422
        assert c.post('/chat',json={'question':'Hi','tools':['shell']}).status_code==422
        assert c.options('/chat',headers={'origin':'https://nagi.tw','access-control-request-method':'POST'}).status_code==200
        for _ in range(2):
            assert c.post('/chat',json={'question':'Hi'}).status_code==200
        assert c.post('/chat',json={'question':'Hi'},headers={'X-Forwarded-For':'new-ip'}).status_code==429


def test_safe_failure_and_health(tmp_path):
    def broken(request):
        return httpx.Response(500,text='private diagnostic')
    with client(tmp_path, broken) as c:
        assert c.get('/healthz').status_code==200
        assert c.get('/readyz').status_code==503
        r=c.post('/chat',json={'question':'secret conversation'})
        assert r.status_code==503
        assert 'private' not in r.text and 'secret' not in r.text


def test_reject_unsafe_settings(tmp_path):
    import pytest
    with pytest.raises(ValueError):
        Settings(ollama_url='http://0.0.0.0:11434')
    knowledge=tmp_path/'bad.json'
    knowledge.write_text('[{"title":"Bad","description":"Secret","url":"https://evil.example/"}]')
    with pytest.raises(ValueError):
        create_app(Settings(knowledge_file=str(knowledge)))


def test_output_bound_and_incomplete_response(tmp_path):
    for output in ['{"message":{"content":"partial"}}\n', json.dumps({'message':{'content':'x'*8001}})+'\n']:
        def model(request):
            return httpx.Response(200,text=output)
        with client(tmp_path,model) as c:
            r=c.post('/chat',json={'question':'Hi'})
            events=[json.loads(line) for line in r.text.splitlines()]
            assert events[-1]['type']=='error'
            assert not any(e['type']=='done' for e in events)
            # Reservation is released even after invalid model output.
            assert c.post('/chat',json={'question':'Hi'}).status_code==200


def test_hash_approval_and_no_echo(tmp_path, capsys):
    import hashlib
    import pytest
    path=tmp_path/'approved.json'
    path.write_text('[{"title":"About","description":"Public","url":"/about/"}]')
    digest=hashlib.sha256(path.read_bytes()).hexdigest()
    app=create_app(Settings(knowledge_file=str(path),knowledge_sha256=digest))
    path.write_text('[]')
    with pytest.raises(ValueError,match='hash mismatch'):
        create_app(Settings(knowledge_file=str(path),knowledge_sha256=digest))
    with client(tmp_path) as c:
        r=c.post('/chat',json={'question':'SENSITIVE_TEST','extra':'PRIVATE_TEST'})
        assert r.status_code==422
        assert 'SENSITIVE_TEST' not in r.text and 'PRIVATE_TEST' not in r.text
        assert c.get('/docs').status_code==404


def test_concurrency_and_timeout(tmp_path):
    import asyncio
    async def run():
        path=tmp_path/'knowledge.json'
        path.write_text('[{"title":"About","description":"Public","url":"/about/"}]')
        entered, release = asyncio.Event(), asyncio.Event()
        async def model(request):
            entered.set()
            await release.wait()
            return httpx.Response(200,text='{"done":true}\n')
        app=create_app(Settings(knowledge_file=str(path)),httpx.MockTransport(model))
        async with app.router.lifespan_context(app):
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app),base_url='http://test') as c:
                first=asyncio.create_task(c.post('/chat',json={'question':'Hi'}))
                await entered.wait()
                assert (await c.post('/chat',json={'question':'Hi'})).status_code==503
                release.set()
                assert (await first).status_code==200
                assert (await c.post('/chat',json={'question':'Hi'})).status_code==200
    asyncio.run(run())


def test_timeout_and_chunked_upload(tmp_path):
    import asyncio
    async def slow(request):
        await asyncio.sleep(1.2)
        return httpx.Response(200,text='{"done":true}\n')
    with client(tmp_path,slow,timeout=1) as c:
        assert c.post('/chat',json={'question':'Hi'}).status_code==503
        assert c.post('/chat',content=iter([b'x'*4000,b'x'*5000]),headers={'content-type':'application/json'}).status_code==413
        assert c.post('/chat',json={'question':'Hi'},headers={'origin':'null'}).status_code==403


def test_logs_never_contain_conversation(tmp_path):
    import logging
    from app import log
    records=[]
    class Capture(logging.Handler):
        def emit(self, record):
            records.append(record.getMessage())
    handler=Capture()
    log.addHandler(handler)
    try:
        with client(tmp_path) as c:
            c.post('/chat',json={'question':'SENSITIVE_QUESTION'},headers={'authorization':'PRIVATE_CREDENTIAL'})
        assert records
        serialized=' '.join(records)
        assert 'SENSITIVE_QUESTION' not in serialized and 'PRIVATE_CREDENTIAL' not in serialized and 'Hello' not in serialized
        assert all(set(json.loads(r))=={'event','request_id','status','duration_ms'} for r in records)
    finally:
        log.removeHandler(handler)


def test_cancellation_releases_inference(tmp_path):
    import asyncio
    async def run():
        path=tmp_path/'knowledge.json'
        path.write_text('[{"title":"About","description":"Public","url":"/about/"}]')
        entered, closed = asyncio.Event(), asyncio.Event()
        class SlowStream(httpx.AsyncByteStream):
            async def __aiter__(self):
                yield b'{"message":{"content":"partial"}}\n'
                entered.set()
                await asyncio.Event().wait()
            async def aclose(self):
                closed.set()
        calls=0
        async def model(request):
            nonlocal calls
            calls+=1
            return httpx.Response(200,stream=SlowStream()) if calls==1 else httpx.Response(200,text='{"done":true}\n')
        app=create_app(Settings(knowledge_file=str(path)),httpx.MockTransport(model))
        async with app.router.lifespan_context(app):
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app),base_url='http://test') as c:
                first=asyncio.create_task(c.post('/chat',json={'question':'Hi'}))
                await asyncio.wait_for(entered.wait(),2)
                first.cancel()
                try:
                    await first
                except asyncio.CancelledError:
                    pass
                assert closed.is_set(),'Cancelled stream must close the upstream connection'
                assert (await c.post('/chat',json={'question':'Hi'})).status_code==200
    asyncio.run(run())


@pytest.mark.parametrize('failure',['start','body','stalled'])
def test_asgi_response_start_failure_closes_upstream(tmp_path,failure):
    import asyncio
    async def run():
        path=tmp_path/'knowledge.json'
        path.write_text('[{"title":"About","description":"Public","url":"/about/"}]')
        closed=asyncio.Event()
        class TrackedStream(httpx.AsyncByteStream):
            async def __aiter__(self):
                yield b'{"message":{"content":"Hello"}}\n'
                yield b'{"done":true}\n'
            async def aclose(self):
                closed.set()
        async def model(request):
            return httpx.Response(200,stream=TrackedStream())
        app=create_app(Settings(knowledge_file=str(path),timeout=1),httpx.MockTransport(model))
        sent=False
        async def receive():
            nonlocal sent
            if not sent:
                sent=True
                return {'type':'http.request','body':b'{"question":"Hi"}','more_body':False}
            await asyncio.Event().wait()
        async def send(message):
            if failure=='start' or message['type']=='http.response.body':
                if failure=='stalled':
                    await asyncio.Event().wait()
                raise OSError('client disconnected')
        scope={'type':'http','asgi':{'version':'3.0','spec_version':'2.4'},'http_version':'1.1','method':'POST','scheme':'http',
               'path':'/chat','raw_path':b'/chat','query_string':b'','root_path':'','headers':[(b'content-type',b'application/json')],
               'client':('127.0.0.1',12345),'server':('test',80)}
        async with app.router.lifespan_context(app):
            try:
                await asyncio.wait_for(app(scope,receive,send),2)
            except Exception:
                pass
            assert closed.is_set(),'Failure before body iteration must still close upstream'
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app),base_url='http://test') as c:
                assert (await c.post('/chat',json={'question':'Hi'})).status_code==200
    asyncio.run(run())


@pytest.mark.parametrize('close_failure',[False,True])
@pytest.mark.parametrize('upstream_status',[200,500])
def test_reservation_retained_until_close_and_fail_closed(tmp_path,close_failure,upstream_status):
    import asyncio
    async def run():
        path=tmp_path/'knowledge.json'
        path.write_text('[{"title":"About","description":"Public","url":"/about/"}]')
        closing, release = asyncio.Event(), asyncio.Event()
        class ClosingStream(httpx.AsyncByteStream):
            async def __aiter__(self):
                yield b'{"done":true}\n'
            async def aclose(self):
                closing.set()
                await release.wait()
                if close_failure:
                    raise OSError('closure failure')
        calls=0
        async def model(request):
            nonlocal calls
            calls+=1
            return httpx.Response(upstream_status,stream=ClosingStream()) if calls==1 else httpx.Response(200,text='{"done":true}\n')
        app=create_app(Settings(knowledge_file=str(path)),httpx.MockTransport(model))
        async with app.router.lifespan_context(app):
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app),base_url='http://test') as c:
                first=asyncio.create_task(c.post('/chat',json={'question':'Hi'}))
                await asyncio.wait_for(closing.wait(),2)
                assert (await c.post('/chat',json={'question':'Hi'})).status_code==503
                assert calls==1,'No overlapping inference while closing'
                release.set()
                assert (await first).status_code==(200 if upstream_status==200 else 503)
                assert (await c.post('/chat',json={'question':'Hi'})).status_code==(503 if close_failure else 200)
                if close_failure:
                    assert (await c.get('/readyz')).status_code==503
    asyncio.run(run())
