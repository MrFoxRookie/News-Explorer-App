import { z } from "zod";

const addArticleSchema = z.object({
  description: z.string(),
  publishedAt: z.string().datetime(),
  source: z.string(),
  title: z.string(),
  url: z.string(),
  urlToImage: z.string(),
});

export function validateArticle(input) {
  return addArticleSchema.safeParse(input);
}
