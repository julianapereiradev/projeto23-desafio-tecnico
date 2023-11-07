import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
export function validateBody(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      convert: false,
    });
    if (error) {
      return res
        .status(400)
        .send({ type: "invalid body!", message: error.message });
    }
    next();
  };
}
