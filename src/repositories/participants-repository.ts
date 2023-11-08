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


async function getParticipantId (id: number) {
  return prisma.participant.findUnique({
    where: {
      id,
    },
  });
};

async function subtractingBalanceAfterBet (participantId: number, betAmount: number) {
  return prisma.participant.update({
    where: {
      id: participantId,
    },
    data: {
      balance: {
        decrement: betAmount,
      },
    },
  });
};

export const participantsRepository = {
createParticipant,
getParticipants,
getParticipantId,
subtractingBalanceAfterBet
};
