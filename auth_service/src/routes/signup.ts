import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@sn1006/common";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
    "/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must be between 4 and 20 characters"),
    ],
    validateRequest,
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
