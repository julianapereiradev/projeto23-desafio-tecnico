import { BetProtocol } from "../protocols";
import { Request, Response } from "express";
import httpStatus from "http-status";
import betService from "../services/bets-service";

export async function postBet(req: Request, res: Response) {
  const body = req.body as BetProtocol;

  const postbet = await betService.postBets(body);

  return res.status(httpStatus.CREATED).send(postbet);
}
