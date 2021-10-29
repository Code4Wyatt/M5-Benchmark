import { checkSchema, validationResult } from "express-validator";

const schema = {
  title: {
    in: ["body"],
    isString: {
      errorMessage: "title validation failed , type must be string  ",
    },
  },
  year: {
    in: ["body"],
    isNumeric: {
      errorMessage: "category validation failed , type must be numeric ",
    },
  },
  type: {
    in: ["body"],
    isString: {
      errorMessage: "content validation failed , type must be string ",
    },
  },
  poster: {
    in: ["body"],
    isString: {
      errorMessage: "author.name validation failed , type must be string",
    },
  },
};



const reviewSchema = {
  comment: {
    isString: {
      errorMessage: "Text field is required for comment",
    },
  },
  rate: {
    isNumeric: {
      errorMessage: "Value must be a number",
    },
  },
};

export const checMediaSchema = checkSchema(schema);

export const checkReviewSchema = checkSchema(reviewSchema);

export const checkBlogPostSchema = checkSchema(schema);

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Blog post validation is failed");
    error.status = 400;
    error.errors = errors.array();
    next(error);
  }
  next();
};
