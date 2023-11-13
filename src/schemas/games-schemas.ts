import Joi from "joi";
import { GameProtocol, FinalScoreProtocol } from "protocols";

export const createGameSchema = Joi.object<GameProtocol>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const createFinalScoreSchema = Joi.object<FinalScoreProtocol>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
});
