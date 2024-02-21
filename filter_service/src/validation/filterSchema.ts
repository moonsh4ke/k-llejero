import { Schema } from "express-validator";

export const filterSchema: Schema = {
  filter: {
    exists: {
      errorMessage: "Filter field is required",
      bail: true
    }
  },
  "filter.name": {
    exists: {
      errorMessage: "Name field is required",
      bail: true
    },
    isLength: {
      options: {
        min: 1,
        max: 30
      },
      errorMessage: "Name must be at least 1 and maximun 30 characters long",
    }
  },
  "filter.description": {
    exists: {
      errorMessage: "Description field is required",
      bail: true
    },
    isLength: {
      options: {
        min: 10,
        max: 200
      },
      errorMessage: "Description must be at least 10 and maximun 200 characters long"
    }
  },
  "filter.keywords": {
    optional: true,
    isArray: {
      errorMessage: "Keywords field must be an array",
    }
  },
  "filter.active": {
    exists: {
      errorMessage: "Active field is required",
    }
  }
}
