import { BadRequestError, zodValidateRequest } from "@sn1006/common";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Password } from "../services/password";

import { authSchema } from "@sn1006/schemas";

const router = express.Router();

router.post(
    "/signin",
    zodValidateRequest(authSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return next(new BadRequestError('Invalid Credentials'));
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);

        if(!passwordsMatch) {
            return next(new BadRequestError('Invalid Credentials'))
        }

        // Generate JWT
        const userJwt = jwt.sign(
            { id: existingUser.id, email: existingUser.email },
            process.env.JWT_KEY!
        );

        // Store it on session
        req.session = {
            jwt: userJwt,
        };

        res.status(200).send(existingUser);
    }
);

export { router as signinRouter };
