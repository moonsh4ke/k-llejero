import { BadRequestError, zodValidateRequest } from "@sn1006/common";
import { authSchema } from "@sn1006/schemas";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const router = express.Router();

router.post(
    "/signup",
    zodValidateRequest(authSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const err = new BadRequestError("Email in use");
            return next(err);
        }

        const user = User.build({ email, password });
        await user.save();

        // Generate JWT
        const userJwt = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_KEY!
        );

        // Store it on session
        req.session = {
            jwt: userJwt,
        };

        res.status(201).send(user.toJSON());
    }
);

export { router as signupRouter };
