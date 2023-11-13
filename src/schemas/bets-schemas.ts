import Joi from "joi";
import { BetProtocol } from "protocols";

export const createBetSchema = Joi.object<BetProtocol>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
  amountBet: Joi.number().required(),
  gameId: Joi.number().integer().required(),
  participantId: Joi.number().integer().required(),
});
