import { Request, Response, NextFunction} from "express";
import { Schema } from "joi";

export function validateBody(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessages = error.details.map((e) => e.message);
        console.log(errorMessages);
        return res.status(422).send(errorMessages);
      }
  
      next();
    };
  }
  