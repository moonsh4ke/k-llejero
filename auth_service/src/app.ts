import express from 'express';
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from '@sn1006/common';
import cookieSession from 'cookie-session'

const app = express();

app.use(json());
app.set('trust proxy', true); // Express is aware of a proxy (ingress nginx)
app.use(
    cookieSession({
        signed: false, // diable encryption
        secure: process.env.NODE_ENV !== 'test'
    })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

export { app };
