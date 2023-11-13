import Joi from "joi";
import { ParticipantProtocol } from "protocols";

export const createParticipantSchema = Joi.object<ParticipantProtocol>({
  name: Joi.string().required(),
  balance: Joi.number().integer().required(),
});
