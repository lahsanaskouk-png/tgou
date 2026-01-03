import { z } from 'zod'

export const registerSchema = z.object({
  phone: z.string().regex(/^(05|06|07)\d{8}$/, 'Invalid Saudi phone'),
  password: z.string().min(8, 'Min 8 chars'),
  confirm: z.string(),
  antiBot: z.string(),
}).refine(data => data.password === data.confirm, {
  message: 'Passwords must match',
  path: ['confirm'],
})

export const loginSchema = z.object({
  phone: z.string().regex(/^(05|06|07)\d{8}$/, 'Invalid Saudi phone'),
  password: z.string().min(1, 'Required'),
})
