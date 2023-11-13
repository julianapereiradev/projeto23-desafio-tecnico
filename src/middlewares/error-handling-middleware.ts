import { Request, Response, NextFunction } from "express";

export function handleApplicationErrors(
  err,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err?.type === "application")
    return res.status(err.code).send(err.message);
  return res.sendStatus(500);
}
