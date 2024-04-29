import { errorHandler, zodValidateRequest, asyncWrapper } from "@sn1006/common";
import { filterSchema } from "@sn1006/schemas";
import { json, raw } from "body-parser";
import express, { Request, Response } from "express";
import morgan from "morgan";
import { Filter } from "./models/filter";
import { OnuCategory } from "./models/onuCategory";

interface Tender {
  code: string;
  type?: string;
  name: string;
  state_code: number;
  end_date?: string;
  description: string;
  organism?: string;
  purchasing_region?: string;
  publication_date?: string;
  service_description?: string;
  onu_code?: number;
  measure_unit?: string;
  quantity?: number;
  generic?: string;
  level1?: string;
  level2?: string;
  level3?: string;
}

const app = express();

app.use(json());

app.use(morgan("tiny"));
app.set("trust proxy", true);

app.get(
  "/onu_categories",
  asyncWrapper(async (req, res) => {
    const onuCategories = await OnuCategory.find({});
    return res.status(200).send(onuCategories);
  })
);

app.get(
  "/filter_tenders",
  raw({
    type: "application/octec-stream",
    limit: "80mb",
    inflate: true,
  }),
  asyncWrapper(async (req, res) => {
    const tenders_bin = req.body;
    const tenders_json = tenders_bin.toString("utf-8");

    const tenders = JSON.parse(tenders_json);

    const filters = await Filter.find({});

    let filter_tenders = [];

    for (let tender of tenders) {
      let add = false;
      let matchs = [];
      for (let filter of filters) {
        for (let keyword of filter.keywords) {
          const kReg = new RegExp(keyword.value, "i");
          if (tender.description.match(kReg)) {
            add = true;
            matchs.push({
              filter: filter.name,
              keyword: keyword.value,
              on: "descripción",
            });
          }
          if (tender.name.match(kReg)) {
            add = true;
            matchs.push({
              filter: filter.name,
              keyword: keyword.value,
              on: "nombre",
            });
          }
          if (tender.categories) {
            for (let category of tender.categories) {
              if (category.match(kReg)) {
                add = true;
                matchs.push({
                  filter: filter.name,
                  keyword: keyword.value,
                  on: "categoria",
                });
              }
            }
          }
          if (tender.items) {
            for (let item of tender.items) {
              if (item.serviceDescription.match(kReg)) {
                add = true;
                matchs.push({
                  filter: filter.name,
                  keyword: keyword.value,
                  on: "datos de item",
                });
              }
              if (item.generic.match(kReg)) {
                add = true;
                matchs.push({
                  filter: filter.name,
                  keyword: keyword.value,
                  on: "datos de item",
                });
              }
            }
          }
        }
      }
      if (add === true) {
        filter_tenders.push({
          ...tender,
          filter: {
            date: new Date(),
            matchs,
          },
        });
      }
    }

    return res.status(200).send(filter_tenders);
  })
);

app.get(
  "/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const filter = await Filter.findById(id);
    return res.status(200).send(filter);
  })
);

app.put(
  "/:id",
  zodValidateRequest(filterSchema),
  asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const reqFilter = req.body;
    const filter = await Filter.findByIdAndUpdate(id, reqFilter);
    res.status(200).send(filter);
  })
);

app.get(
  "/",
  asyncWrapper(async (req, res) => {
    const filters = await Filter.find({});
    return res.status(200).send(filters);
  })
);

app.post(
  "/",
  zodValidateRequest(filterSchema),
  asyncWrapper(async (req: Request, res: Response) => {
    const reqFilter = req.body;
    const newFilter = new Filter(reqFilter);
    newFilter.save();
    return res.status(200).send(newFilter);
  })
);

app.delete(
  "/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const delFilter = await Filter.findByIdAndDelete(id);
    return res.status(200).send(delFilter);
  })
);

app.use(errorHandler);

export { app };
