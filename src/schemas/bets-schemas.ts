import Joi from "joi";
//import { CreateUserParams } from '@/services/users-service';

export const createBetSchema = Joi.object({
  createdAt: Joi.string().isoDate().isoDate().required(),
  updatedAt: Joi.string().isoDate().isoDate().required(),
  homeTeamScore: Joi.number().required(), 
  awayTeamScore: Joi.number().required(),
  amountBet: Joi.number().required(),
  gameId: Joi.number().required(),
  participantId: Joi.number().required(),
  status: Joi.string().required(),
  amountWon: Joi.string().allow(null, '').required(),
});
