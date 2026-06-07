import { z } from 'zod'

export const registerSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const createCheckoutSchema = z.object({
  plan: z.enum(['monthly', 'biannual', 'annual']),
  currency: z.enum(['ILS', 'USD', 'EUR', 'GBP', 'CAD', 'AUD']),
  donation_target: z.enum(['yeshiva', 'poor_families', 'split_50_50']),
})

export const updateProfileSchema = z.object({
  full_name: z.string().min(2).max(100).optional(),
  preferred_language: z.enum(['he', 'en']).optional(),
  preferred_currency: z.enum(['ILS', 'USD', 'EUR', 'GBP', 'CAD', 'AUD']).optional(),
})

export const updateDonationTargetSchema = z.object({
  subscription_id: z.string().uuid(),
  donation_target: z.enum(['yeshiva', 'poor_families', 'split_50_50']),
})

export const completeLessonSchema = z.object({
  lesson_id: z.string().uuid(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type UpdateDonationTargetInput = z.infer<typeof updateDonationTargetSchema>
export type CompleteLessonInput = z.infer<typeof completeLessonSchema>
