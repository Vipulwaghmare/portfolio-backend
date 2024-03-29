import z from 'zod';

export const userTokenSchema = z.object({
  userId: z.string(),
  userEmail: z.string(),
})

export const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  }).email({
    message: 'Invalid Email'
  }),
  password: z.string().min(3),
});

export const registerSchema = z.object({
  name: z.string({
    required_error: "Please enter a name"
  }),
  email: z.string({
    required_error: "Email is required",
  }).email({
    message: 'Invalid Email'
  }),
  password: z.string().min(3),
});

export const accessTokenSchema = userTokenSchema.extend({
  refreshToken: z.string(),
});

export const updatePasswordSchema = userTokenSchema.extend({
  oldPassword: z.string(),
  newPassword: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.string(),
});

export const resetPasswordSchema = z.object({
  password: z.string(),
  token: z.string(),
});