import { invalidDataError } from '../errors';
import { ParticipantProtocol } from '../protocols';
import participantService from '../services/participants-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';


export async function postParticipant(req: Request, res: Response) {
  const body  = req.body as ParticipantProtocol 

  const participant = await participantService.postParticipants(body);

  if (participant.balance < 1000) throw invalidDataError('Saldo mínimo insuficiente')

  return res.status(httpStatus.CREATED).send(participant);
}

export async function getParticipant(req: Request, res: Response) {
    //const { userId } = req;
  
    //const bookings = await bookingsService.getParticipant(userId);
  
    res.status(httpStatus.OK);
  }