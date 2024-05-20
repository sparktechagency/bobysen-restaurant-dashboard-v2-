import * as z from "zod";

const menuCategorySchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" }),
});

const menuSchema = z.object({
  category: z
    .string({ required_error: "Category is required" })
    .min(1, { message: "Category is required" }),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
  price: z.coerce
    .number({ required_error: "Price is required" })
    .min(1, { message: "Price is required" }),
  available: z.string().optional(),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" }),
});

export const menuValidationSchema = {
  menuCategorySchema,
  menuSchema,
};
