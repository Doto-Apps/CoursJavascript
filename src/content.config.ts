import { glob } from 'astro/loaders';
import { z, defineCollection } from 'astro:content';

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/pages", generateId: ({ entry }) => entry.replace(/\.md$/, ''), }),
  schema: z.object({
    title: z.string(),
    layout: z.string(),
    type: z.string().optional(),
    order: z.number().int().positive().optional(),
    hidden: z.boolean().optional(),
    quizId: z.string().optional(),
    previousSession: z.string().regex(/^\/(?!\/)[^?#\s]*$/, "Utiliser un chemin interne sans paramètres").optional(),
    nextSession: z.string().regex(/^\/(?!\/)[^?#\s]*$/, "Utiliser un chemin interne sans paramètres").optional(),
  }),
});

export const collections = { pages };
