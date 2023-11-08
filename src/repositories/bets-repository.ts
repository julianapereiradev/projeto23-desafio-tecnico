import { BetProtocol } from '../protocols';
import { prisma } from '../database/database';

async function createBet(betData: BetProtocol) {
  return await prisma.bet.create({
    data: betData
  });
}

async function isBetAlreadyRegistered (gameId: number, participantId: number) {
    return prisma.bet.findFirst({
      where: {
        gameId: gameId,
        participantId: participantId,
      },
    });
  };
  

export const betsRepository = {
createBet,
isBetAlreadyRegistered
};
