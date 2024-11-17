import { userEntitySchema } from "../schemas/userSchema";
import { z } from "zod";
  
export type UserEntity = z.infer<typeof userEntitySchema>;