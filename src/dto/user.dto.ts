import { z } from "zod";
import { userDTOSchema, userEntitySchema } from "../schemas/userSchema";
import { UserEntity } from "../entity/user.entity";
import { ObjectId } from "mongodb";

// Create the UserDTO type
export type UserDTO = z.infer<typeof userDTOSchema>;

// Create the userDTO object 
// TypeScript manage “types” and “concrete object definitions” 
// in different namespaces
export const UserDTO = {
    convertFromEntity(entity: UserEntity): UserDTO {
      const candidate: UserDTO = {
        id: entity._id.toHexString(),
        username: entity.username,
        email: entity.email,
        password: entity.password,
      };
      return userDTOSchema.parse(candidate);
    },

    toEntity(dto: UserDTO): UserEntity {
        const entity: UserEntity = {
          _id: new ObjectId(dto.id),
          username: dto.username,
          email: dto.email,
          password: dto.password,
        };
        return userEntitySchema.parse(entity);
      }
  };