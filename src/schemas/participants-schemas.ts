import Joi from 'joi';
//import { CreateUserParams } from '@/services/users-service';

export const createParticipantSchema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().integer().required()
});
