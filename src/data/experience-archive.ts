import data from './experience-archive.json';
import type { ArchiveRecord } from '../lib/experience';
// Editorial inventory only. Public routes must use the approved snapshots in experience.ts.
export const experienceArchive = data as readonly ArchiveRecord[];
