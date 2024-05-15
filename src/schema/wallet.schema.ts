import * as z from "zod";

const walletSchema = z.object({
  amount: z.coerce
    .number({ required_error: "Amount is required" })
    .min(1, { message: "Amount is required" }),
  percentage: z.coerce
    .number({ required_error: "Percentage is required" })
    .min(1, { message: "Percentage is required" }),

  method: z
    .string({ required_error: "Method is required" })
    .min(1, { message: "Method is required" }),
});

export const walletValidationSchema = {
  walletSchema,
};
