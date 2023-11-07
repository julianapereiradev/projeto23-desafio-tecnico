import Joi from "joi";
//import { CreateUserParams } from '@/services/users-service';

export const createGameSchema = Joi.object({
  createdAt: Joi.string().isoDate().isoDate().required(),
  updatedAt: Joi.string().isoDate().isoDate().required(),
  homeTeamName: Joi.string().required(), 
  awayTeamName: Joi.string().required(), 
  homeTeamScore: Joi.number().required(), 
  awayTeamScore: Joi.number().required(),
  isFinished: Joi.boolean().required(),
  name: Joi.string().required(),
  balance: Joi.number().required(),
});
