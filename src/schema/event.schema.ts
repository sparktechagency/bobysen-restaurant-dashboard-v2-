import { z } from "zod";

export const insertEventSchema = z.object({
  title: z.string().min(1, { message: "Event title is required" }),
  restaurant: z
    .string()
    .min(1, { message: "Restaurant selection is required" }),
  date: z.string().min(1, { message: "Date is required" }), // Assuming date is in string format
  description: z.string().optional(),
});
