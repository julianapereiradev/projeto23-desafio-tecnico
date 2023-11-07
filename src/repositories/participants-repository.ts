import { ParticipantProtocol } from '../protocols';
import { prisma } from '../database/database';

async function createParticipant(participantData: ParticipantProtocol) {
  return await prisma.participant.create({
    data: participantData
  });
}

export const participantsRepository = {
createParticipant,
};
