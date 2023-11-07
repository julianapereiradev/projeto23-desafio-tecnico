import { Request, Response, NextFunction } from "express";

export function handleApplicationErrors(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err?.type === "application")
    return res.status(err.code).send(err.message);
  return res.sendStatus(500);
}
