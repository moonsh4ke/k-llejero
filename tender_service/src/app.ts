import express from 'express'
import { json } from 'body-parser'
import { Tender } from './models/tender'

const app = express();
app.use(json());
app.set('trust proxy', true);

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const tender = await Tender.findById(id);
  if(!tender)
    return res.status(404);

  return res.status(200).send(tender)
})

app.get('/', async (req, res) => {
  const tenders = await Tender.find({});
  return res.status(200).send(tenders);
})


export { app }
