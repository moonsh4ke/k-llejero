import mongoose from "mongoose";

const onuCategorySchema = new mongoose.Schema(
  {
    code: { type: Number, required: true },
    name: { type: String, required: true },
    cat1: { type: String, required: true },
    cat2: { type: String, required: true },
    cat3: { type: String, required: true },
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

const OnuCategory = mongoose.model("OnuCategory", onuCategorySchema);

export { OnuCategory };
