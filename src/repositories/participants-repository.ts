import { ParticipantProtocol } from '../protocols';
import { prisma } from '../database/database';

async function createParticipant(participantData: ParticipantProtocol) {
  return await prisma.participant.create({
    data: participantData
  });
}

async function getParticipants() {
  return await prisma.participant.findMany()
}

export const participantsRepository = {
createParticipant,
getParticipants
};
