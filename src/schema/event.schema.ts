import { z } from "zod";

export const insertEventSchema = z.object({
  title: z.string().min(1, { message: "Event title is required" }),
  entryFee: z.coerce.number().min(1, { message: "Event fee is required" }),
  restaurant: z
    .string()
    .min(1, { message: "Restaurant selection is required" }),
  startDate: z.string().min(1, { message: "start date is required" }), // Assuming date is in string format
  endDate: z.string().min(1, { message: "End date is required" }), // Assuming date is in string format
  description: z.string().optional(),
});
