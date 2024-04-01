import { z } from 'zod';

export const GuestbookValidation = z.object({
  username: z.string().min(1),
  body: z.string().min(1),
});

export const EditGuestbookValidation = z.object({
  id: z.coerce.number(),
  username: z.string().min(1),
  body: z.string().min(1),
});

export const EditCategoryValidation = z.object({
  id: z.coerce.number(),
  name: z.string().min(1),
  image: z.string().optional(),
});

export const DeleteGuestbookValidation = z.object({
  id: z.coerce.number(),
});

export const DeleteCategoryValidation = z.object({
  id: z.coerce.number(),
});

export const categoryValidate = z.object({
  name: z.string().min(1),
  image: z.string().optional(),
});

export const productValidate = z.object({
  name: z.string().min(1),
  price: z.string(),
  category_id: z.number().min(1),
  description: z.string().optional(),
  attribute: z.string().optional(),
  images: z.string().optional(),
});

export const productEditValidate = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1),
  price: z.string(),
  category_id: z.number().min(1),
  description: z.string().optional(),
  attribute: z.string().optional(),
  images: z.string().optional(),
});
