---
title: "Technical article typography"
description: "An isolated Journal layout fixture."
subtitle: "A reading sample for headings, code, tables, and figures."
slug: article-foundation-qa
language: en
publishedAt: "2026-01-10"
updatedAt: "2026-01-11"
status: draft
kind: note
author: "Editorial QA"
tags: ["Layout"]
cover: ../../../public/nagi.svg
coverAlt: "The Nagi site mark"
coverCaption: "Existing site artwork used to verify cover captions."
references:
  - label: "Astro Markdown guide"
    url: https://docs.astro.build/en/guides/markdown-content/
---

## Reading order

This layout sample contains ordinary paragraphs, an [internal link](/journal/), and inline code such as `layout.measure`. It uses a published site asset to check that article figures retain their original proportions.

A second paragraph checks spacing and uses **strong emphasis**, *emphasis*, and a footnote.[^layout]

### Steps and nested lists

1. Read the heading and the paragraph underneath it.
   - First nested item.
   - Second nested item.
2. Follow the next section.

#### A small callout

> Clear typography makes long code and tables easier to read.

```js
const sample = "A very long line of harmless fixture text, repeated to exercise horizontal scrolling at all viewport widths. A very long line of harmless fixture text, repeated to exercise horizontal scrolling at all viewport widths.";
if (sample.length > 0) {
  console.log(sample);
}
```

## Wide table

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 | Column 6 | Column 7 | Column 8 | Column 9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Sample A | Sample B | Sample C | Sample D | Sample E | Sample F | Sample G | Sample H | Sample I |

---

## Figure

<figure>
  <img src="/nagi.svg" alt="The Nagi site mark shown at its original square aspect ratio" width="480" height="480" />
  <figcaption>Approved site artwork for the responsive figure check.</figcaption>
</figure>

[^layout]: This footnote checks the generated reference and back link.

## 重複標題

The first heading checks fragment encoding.

### Nested section

```text
  First line
    Indented second line
```

## 重複標題

The repeated heading checks Astro's unique fragment suffix.
