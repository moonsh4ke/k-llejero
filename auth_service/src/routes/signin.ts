import express from "express";
import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validateRequest } from "@sn1006/common";
import { User } from "../models/user"
import { BadRequestError } from "@sn1006/common"
import { Password } from "../services/password"
import jwt from "jsonwebtoken"

const router = express.Router();

router.post(
    "/signin",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("You must supply a password"),
    ],
    validateRequest,
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
