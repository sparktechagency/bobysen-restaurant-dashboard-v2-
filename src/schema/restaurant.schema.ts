// import moment from "moment";
import dayjs from "dayjs";

import { object, string, boolean } from "zod";

const OpeningHoursSchema = object({
  openingTime: string(), // Assuming openingTime and closingTime are strings
  closingTime: string(),
}).refine(
  ({ openingTime, closingTime }) => {
    console.log(openingTime, closingTime);
    // Custom validation: closingTime must not be earlier than openingTime
    const openingMoment = dayjs(openingTime, "HH:mm");
    const closingMoment = dayjs(closingTime, "HH:mm");
    return openingMoment.isBefore(closingMoment, "minute"); // Return true if closingTime is after openingTime
  },
  {
    message: "Closing time must be later than opening time",
  }
);

// Define the insertRestaurantSchema
const insertRestaurantSchema = object({
  name: string().min(1, { message: "Restaurant name is required" }),
  location: string().min(1, { message: "Restaurant location is required" }),
  description: string().min(1, { message: "Description is required" }),
  close: object({
    from: string().optional(),
    to: string().optional(),
  }).optional(),
  reviewStatus: boolean().optional(),
  sunday: OpeningHoursSchema,
  monday: OpeningHoursSchema,
  tuesday: OpeningHoursSchema,
  wednesday: OpeningHoursSchema,
  thursday: OpeningHoursSchema,
  friday: OpeningHoursSchema,
  saturday: OpeningHoursSchema,
});

export const restaurantSchema = {
  insertRestaurantSchema,
};
