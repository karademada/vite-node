import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entity/user.entity";
import { userEntitySchema, validateAndHashPassword } from "../schemas/userSchema";
import { Db, MongoClient, ObjectId } from "mongodb";
import { z } from "zod";


export class UserService {
  private readonly db: Db;

  constructor(mongoClient: MongoClient) {
    this.db = mongoClient.db();
  }

  private getUserCollection() {
    return this.db.collection<UserEntity>("users");
  }

  async findOne(id: string): Promise<UserDTO | null> {
    const user = await this.getUserCollection().findOne({
      _id: new ObjectId(id),
    });
    return user ? UserDTO.convertFromEntity(user) : null;
  }

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.getUserCollection().find().toArray();
    return users.map((user) => UserDTO.convertFromEntity(user));
  }

  async createUser(dto: Omit<UserDTO, "id">): Promise<UserDTO> {
    // check if the user already exists
    const existingUser = await this.getUserCollection().findOne({
      email: dto.email,
    });
    if (existingUser) {
        // return user exist
        throw new Error("User already exists");
    }
    
    const candidate = userEntitySchema.parse({
      ...dto,
      _id: new ObjectId(),
    });

    const { insertedId } = await this.getUserCollection().insertOne(candidate);
    return UserDTO.convertFromEntity({ ...dto, _id: insertedId });
  }

  async updateUser(
    id: string,
    dto: Omit<Partial<UserDTO>, "id">
  ): Promise<UserDTO | null> {
    const user = userEntitySchema.partial().parse(dto);

    const result = await this.getUserCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: user },
      { returnDocument: "after" }
    );

    return result ? UserDTO.convertFromEntity(result) : null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.getUserCollection().deleteOne({
      _id: new ObjectId(id),
    });

    return result.deletedCount > 0;
  }
}
