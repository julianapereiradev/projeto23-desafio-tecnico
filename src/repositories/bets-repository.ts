import { BetProtocol } from '../protocols';
import { prisma } from '../database/database';

async function createBet(betData: BetProtocol) {
  return await prisma.bet.create({
    data: betData
  });
}


export const betsRepository = {
createBet,
};
