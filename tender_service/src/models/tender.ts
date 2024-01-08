import mongoose from "mongoose";

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
      },
    },
    versionKey: false,
  }
);

const Tender = mongoose.model("Tender", tenderSchema)

export { Tender };
