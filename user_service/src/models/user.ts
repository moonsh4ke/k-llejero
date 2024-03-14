import mongoose from "mongoose";

interface UserRawDoc {
  rut: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
};

interface UserDoc extends mongoose.Document {
  rut: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
};

const userSchema = new mongoose.Schema(
  {
    rut: String,
    name: String,
    lastname: String,
    email: String,
    phone: String,
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

const User = mongoose.model<UserDoc>("User", userSchema)

export { User , UserDoc, UserRawDoc };
