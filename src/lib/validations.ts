import { z } from 'zod';

export const petIdSchema = z.string().cuid();
export const petSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  ownerName: z.string().trim().min(1, 'Owner name is required').max(100),
  imageUrl: z.union([z.literal(''), z.string().url('Invalid image URL')]),
  age: z.coerce.number().min(0, 'Age is required'),
  notes: z.union([z.literal(''), z.string().max(1000)]),
});

export type PetFormValues = z.infer<typeof petSchema>;

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100).min(6),
});

export type AuthFormValues = z.infer<typeof authSchema>;
