import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  username: z.string({ required_error: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string({ required_error: 'Phone is required' }),
  address: z.string({ required_error: 'Address is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  state: z.string({ required_error: 'State is required' }),
  role: z.enum(['user', 'admin']).optional(),
});

export const UserValidations = {
  userValidationSchema,
};
