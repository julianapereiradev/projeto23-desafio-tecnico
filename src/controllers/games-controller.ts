import { GameProtocol } from "../protocols";
import { Request, Response } from "express";
import httpStatus from "http-status";
import gameService from "../services/games-service";

export async function postGame(req: Request, res: Response) {
  const body = req.body as GameProtocol;

  const postGame = await gameService.postGames(body);

  return res.status(httpStatus.CREATED).send(postGame);
}

export async function getGames(req: Request, res: Response) {
  const games = await gameService.getGames();
  
  return res.status(httpStatus.OK).send(games);
}
