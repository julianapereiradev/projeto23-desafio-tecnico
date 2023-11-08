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


export const gamesRepository = {
createGame,
getGames
};
