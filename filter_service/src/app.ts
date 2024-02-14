import express from 'express';
import { json } from 'body-parser';
import { Filter } from './models/filter';

const app = express();
app.use(json());
app.set('trust proxy', true);

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const filter = await Filter.findById(id);
  return res.status(200).send(filter);
})

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, keywords } = req.body;
  const filter = await Filter.findByIdAndUpdate(id, {name, description, keywords});
  res.status(200).send(filter);
})

app.get('/', async (req, res) => {
  const filters = await Filter.find({});
  return res.status(200).send(filters);
})

app.post('/', async (req, res) => {
  const { name, description, keywords } = req.body;
  const newFilter = new Filter({name, description, keywords});
  newFilter.save();
  return res.status(200).send(newFilter);
})

export { app }
