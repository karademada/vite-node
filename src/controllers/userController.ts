import { Request, Response } from "express";
import { userEntitySchema } from "../schemas/userSchema";
import { ZodError, z } from "zod";
import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/UserService";
import mongoose from "mongoose";



export const registerUser = async (req: Request, res: Response) => {
    // Get the MongoClient instance
const mongoClient = mongoose.connection.getClient();

const userService = new UserService(mongoClient);
    try {
        const createdUser = await userService.createUser(req.body);
        console.log({ createdUser });
        res.json({
            message: 'User registered successfully.',
            user: createdUser,
        });
      } catch (err) {
        if (err instanceof ZodError) {
          const errorMessages = err.errors.map((issue: any) => {
            return {
              message: `${issue.path.join(".")} is ${issue.message}`,
            };
          });
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "Invalid data", details: errorMessages });
        } else {
            console.log(err);
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "An error occurred while registering the user.", details: `${err}`});
        }
      }
       
};  

export const loginUser = (req: Request, res: Response) => {
    res.json({
        message: 'User logged in successfully.',
        user: req.body,
    });
};