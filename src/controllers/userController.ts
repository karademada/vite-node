import { Request, Response } from "express";

export const registerUser = (req: Request, res: Response) => {
    res.json({
        message: 'User registered successfully.',
        user: req.body,
    });
};  

export const loginUser = (req: Request, res: Response) => {
    res.json({
        message: 'User logged in successfully.',
        user: req.body,
    });
};