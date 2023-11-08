import { FinalScoreProtocol, GameProtocol } from "../protocols";
import { Request, Response } from "express";
import httpStatus from "http-status";
import gameService from "../services/games-service";
import { gameAlreadyFinished } from "../errors/errors";
import { gamesRepository } from "../repositories/games-repository";

export async function postGame(req: Request, res: Response) {
  const body = req.body as GameProtocol;

  const postGame = await gameService.postGames(body);

  return res.status(httpStatus.CREATED).send(postGame);
}

export async function getGames(req: Request, res: Response) {
  const games = await gameService.getGames();
  
  return res.status(httpStatus.OK).send(games);
}

export async function getAllBetsByGameId(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  
  const gameBets = await gameService.getBetsByGame(id);
  
  return res.status(httpStatus.OK).send(gameBets);
}

export async function finishGame(req: Request, res: Response) {
  const gameId = parseInt(req.params.id);
  const finalScore = req.body as FinalScoreProtocol


  const game = await gamesRepository.getGameId(gameId);
  if (!game || game.isFinished) throw gameAlreadyFinished("O jogo já foi finalizado ou não foi encontrado")

  const updatedGame = await gameService.finishGame(gameId, finalScore);

  await gameService.calculateAndUpdateBets(gameId, finalScore);

  return res.status(httpStatus.OK).send(updatedGame);
}


