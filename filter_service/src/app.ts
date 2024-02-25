import { errorHandler, zodValidateRequest } from '@sn1006/common';
import { filterSchema } from '@sn1006/schemas';
import { json } from 'body-parser';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { Filter } from './models/filter';

const app = express();
app.use(json());
app.use(morgan('tiny'));
app.set('trust proxy', true);

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const filter = await Filter.findById(id);
  return res.status(200).send(filter);
})

app.put('/:id',
  zodValidateRequest(filterSchema),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const reqFilter = req.body;
    const filter = await Filter.findByIdAndUpdate(id, reqFilter);
    res.status(200).send(filter);
  }
)

app.get('/', async (req, res) => {
  const filters = await Filter.find({});
  return res.status(200).send(filters);
})

app.post('/',
  zodValidateRequest(filterSchema),
  async (req: Request, res: Response) => {
    const reqFilter = req.body;
    const newFilter = new Filter(reqFilter);
    newFilter.save();
    return res.status(200).send(newFilter);
  }
)

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const delFilter = await Filter.findByIdAndDelete(id);
  return res.status(200).send(delFilter);
});

app.use(errorHandler);

export { app };
