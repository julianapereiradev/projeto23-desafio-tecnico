import Joi from "joi";
import { GameProtocol } from "protocols";

export const createGameSchema = Joi.object<GameProtocol>({
  homeTeamName: Joi.string().required(), 
  awayTeamName: Joi.string().required(), 
});
