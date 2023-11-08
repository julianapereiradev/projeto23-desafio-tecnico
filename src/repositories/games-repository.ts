import { GameProtocol } from '../protocols';
import { prisma } from '../database/database';

async function createGame(gameData: GameProtocol) {
  return await prisma.game.create({
    data: gameData
  });
}

async function getGames() {
  return await prisma.game.findMany()
}

async function getGameId (id: number) {
  return prisma.game.findUnique({
    where: {
      id,
    },
  });
};

async function findBetsByGameId(id: number) {
  return prisma.game.findFirst({
    where: {
      id,
    },
    include: {
      Bets: true,
    },
  });
}


export const gamesRepository = {
createGame,
getGames,
getGameId,
findBetsByGameId
};
