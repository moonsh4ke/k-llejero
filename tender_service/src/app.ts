import express from 'express'
import { json } from 'body-parser'
import { Tender, TenderRawDocType, TenderDoc } from './models/tender'
import { Document, FilterQuery, Query, QueryWithHelpers } from 'mongoose';
import { z } from "zod";
import CustomValidationError from '@sn1006/common/build/errors/validation-error';
import { errorHandler } from '@sn1006/common';
import morgan from 'morgan';

const app = express();
app.use(json());
app.use(morgan('tiny'));
app.set('trust proxy', true);

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const tender = await Tender.findById(id);
  if(!tender)
    return res.status(404);

  return res.status(200).send(tender)
})

app.get('/', async (req, res) => {
  const { filter: filterJson } = req.query;

  let tenders: Document<TenderDoc>[];

  if (filterJson) {
    const filters = JSON.parse(filterJson as string);

    const filtersParsed = Object.keys(filters).map(key => {
      let parsedFilter: Record<string, any> = {}
      const regex = new RegExp(filters[key], 'i');
      parsedFilter[key] = regex;
      return parsedFilter;
    });
    tenders = await Tender.find({$and: filtersParsed});
  }
  else
    tenders = await Tender.find({});

  return res.status(200).send(tenders);
})

app.use(errorHandler);


export { app }
