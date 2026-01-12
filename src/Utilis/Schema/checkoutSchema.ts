import { z } from "zod";

export const checkoutSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    phone: z.string().min(8, "Phone number is required"),
    address: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    location: z
      .object({
        latitude: z.number(),
        longitude: z.number(),
        description: z.string().optional(),
      })
      .optional(),
  })
  .refine((data) => data.address || data.location, {
    message: "Please provide either a written address or a map location",
    path: ["address"],
  });

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
