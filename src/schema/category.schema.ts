import { z } from "zod";

export const insertCategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
});
export const editCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});
