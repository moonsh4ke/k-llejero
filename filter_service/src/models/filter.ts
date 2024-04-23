import mongoose from 'mongoose'

const filterSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    active: {type: Boolean, required: true},
    keywords: {
      type: [{
        id: {type: String, required: true},
        value: {type: String, required: true},
      }],
      required: true
    }
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
