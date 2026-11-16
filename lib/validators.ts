import { z } from "zod";

export const quoteRequestSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(100, { message: "Full name is too long." }),
  phone: z
    .string()
    .min(7, { message: "Please enter a valid phone number." })
    .max(25, { message: "Phone number is too long." }),
  email: z
    .string()
    .email({ message: "Please enter a valid commercial email address." }),
  shipmentType: z.enum(["ocean", "air", "road", "warehousing"], {
    error: () => ({ message: "Please select a shipment type." }),
  }),
  pickupLocation: z
    .string()
    .min(2, { message: "Please specify a pickup port, depot, or address." }),
  deliveryLocation: z
    .string()
    .min(2, { message: "Please specify a destination port, depot, or address." }),
  weightVolume: z.string().optional(),
  notes: z.string().max(1000, { message: "Notes must be under 1000 characters." }).optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export const newsletterSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
