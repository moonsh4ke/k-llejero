import express from 'express';
import { json } from 'body-parser'
import { errorHandler, zodValidateRequest } from '@sn1006/common';
import { User, UserRawDoc } from './models/user';
import morgan from 'morgan';
import axios from 'axios';
import { userSchema } from '@sn1006/schemas';

const app = express();

app.use(json());
app.use(morgan('tiny'));
app.set('trust proxy', true); // Express is aware of a proxy (ingress nginx)


app.put(
  '/:id',
  zodValidateRequest(userSchema),
  async (req, res) => {
    const { id } = req.params;
    const payloadUser = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, payloadUser)
    return res.status(200).send(updatedUser);
  }
)

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user)
    return res.status(404);
  return res.status(200).send(user);
})

app.get('/', async (req, res) => {
  const users = await User.find({});
  return res.status(200).send(users);
})

app.post(
  '/',
  zodValidateRequest(userSchema),
  async (req, res) => {
    const payloadUser: UserRawDoc = req.body;
    const newUser = new User(payloadUser);
    await newUser.save();
    let rut = payloadUser.rut;
    const password = payloadUser.name + rut.slice(rut.length - 4, rut.length);

    const authRes = await axios.post(
      'http://auth-srv:3000/signup',
      {
        email: newUser.email,
        password: password,
      }
    );

    return res.status(200).send(newUser);
  }
)

app.use(errorHandler);

export { app };
