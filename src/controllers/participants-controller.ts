import { notMinimumBalance } from "../errors/errors";
import { ParticipantProtocol } from "../protocols";
import participantService from "../services/participants-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postParticipant(req: Request, res: Response) {
  const body = req.body as ParticipantProtocol;

  if (body.balance < 1000)
    throw notMinimumBalance("Não tem saldo mínimo para apostar!");

  const participant = await participantService.postParticipants(body);

  return res.status(httpStatus.CREATED).send(participant);
}

export async function getParticipant(req: Request, res: Response) {
  const participant = await participantService.getParticipants();
  
  return res.status(httpStatus.OK).send(participant);
}
