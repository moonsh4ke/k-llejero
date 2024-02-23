import express, {  NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';
import { Filter } from './models/filter';
import { errorHandler, validateRequest, joiValidateRequest} from '@sn1006/common';
import { checkSchema } from 'express-validator';
import { filterSchema } from './validation/filterSchema';
import { filterJoiSchema } from './validation/schemas';
import morgan from 'morgan';

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
  joiValidateRequest(filterJoiSchema, {allowUnknown: true}),
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
  joiValidateRequest(filterJoiSchema, {allowUnknown: true}),
  async (req: Request, res: Response) => {
    const reqFilter = req.body;
    const newFilter = new Filter(reqFilter);
    newFilter.save();
    return res.status(200).send(newFilter);
  }
)

app.use(errorHandler);

export { app }
