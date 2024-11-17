import { z } from "zod";
import { ObjectId } from "mongodb";

export const userEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  username: z
    .string()
    .min(2, "must be at least 2 characters long")
    .max(50, "cannot exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "cannot exceed 100 characters"),
  password: z
    .string()
    .min(8, "must be at least 8 characters long")
    .max(100, "cannot exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});


export const userDTOSchema = z.object({
  id: z.string(),
  username: userEntitySchema.shape.username,
  email: userEntitySchema.shape.email,
  password: userEntitySchema.shape.password,
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});