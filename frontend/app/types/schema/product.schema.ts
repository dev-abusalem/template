import { z } from "zod";

// all schemas
export const productFormSchema = z.object({
  _id: z.string().optional(),
  barcode: z.string().min(3, { message: "Barcode is required" }),
  serialNumber: z.string(),
  name: z.string().min(3, { message: "Product Name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  model: z.string().optional(),
  unit: z.string().min(1, "Unit is required"),
  regularPrice: z.number().optional(),
  salePrice: z.number(),
  vatPercentage: z.number().min(0, "VAT Percentage must be a positive number"),
  supplier: z.string({ message: "Please select a supplier" }),
  details: z.string().optional(),
  image: z.any(),
});
