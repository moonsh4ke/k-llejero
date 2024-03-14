import mongoose from "mongoose";

interface TenderRawDocType {
    code: String;
    name: String;
    stateCode: Number;
    endDate: Date;
}

interface TenderDoc extends mongoose.Document {
    code: string;
    name: string;
    stateCode: number;
    endDate: Date;
}

const tenderSchema = new mongoose.Schema(
  {
    code: String,
    name: String,
    stateCode: Number,
    endDate: Date,
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: false,
  }
);

const Tender = mongoose.model<TenderDoc>("Tender", tenderSchema)

export { Tender, TenderRawDocType, TenderDoc };
