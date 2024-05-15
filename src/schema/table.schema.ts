import * as z from "zod";

const createTableSchema = z.object({
  tableName: z.string({ required_error: "Table name is required" }),
  tableNo: z.string({ required_error: "Table number is required" }),
  seats: z.coerce
    .number({ required_error: "Seats is required" })
    .min(1, { message: "At least 1 seat is required" }),
});
const EditableSchema = z.object({
  tableName: z.string().min(1, { message: "Table name is required" }),
  tableNo: z
    .string({ required_error: "Table number is required" })
    .min(1, { message: "Table number is required" }),
  seats: z.coerce
    .number({ required_error: "Seats is required" })
    .min(1, { message: "At least 1 seat is required" }),
});

export const tableValidation = {
  createTableSchema,
  EditableSchema,
};
