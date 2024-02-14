import mongoose from 'mongoose'

const filterSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    keywords: [{
      id: String,
      value: String
    }]
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
      },
    },
    versionKey: false,
  }
)

const Filter = mongoose.model("Filter", filterSchema);

export { Filter };
