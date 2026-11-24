import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { createContentSchemas } from './lib/content-schema';

// Keep translations as separate loader entries while sharing a public slug.
const generateId = ({ entry }: { entry: string }) => entry;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects', generateId }),
  schema: ({ image }) => createContentSchemas(image()).projects,
});
const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research', generateId }),
  schema: ({ image }) => createContentSchemas(image()).research,
});
const journal = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/journal', generateId }),
  schema: ({ image }) => createContentSchemas(image()).journal,
});
const photography = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/photography', generateId }),
  schema: ({ image }) => createContentSchemas(image()).photography,
});
const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience', generateId }),
  schema: ({ image }) => createContentSchemas(image()).experience,
});

export const collections = { projects, research, journal, photography, experience };
