import { FinalScoreProtocol, GameProtocol } from "../protocols";
import { prisma } from "../database/database";

async function createGame(gameData: GameProtocol) {
  return await prisma.game.create({
    data: gameData,
  });
}

async function getGames() {
  return await prisma.game.findMany();
}

async function getGameId(id: number) {
  return prisma.game.findUnique({
    where: {
      id,
    },
  });
}

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

async function searchBetsByGameId(id: number) {
  return prisma.bet.findMany({
    where: {
      gameId: id,
    },
  });
}

async function finishGame(gameId: number, finalScore: FinalScoreProtocol) {
  return await prisma.game.update({
    where: { id: gameId },
    data: {
      homeTeamScore: finalScore.homeTeamScore,
      awayTeamScore: finalScore.awayTeamScore,
      isFinished: true,
    },
  });
}

async function updateBetStatusAndAmountWon(
  betId: number,
  status: string,
  amountWon: number
) {
  return await prisma.bet.update({
    where: { id: betId },
    data: { status, amountWon },
  });
}

async function updateParticipantBalance(participantId: number, amount: number) {
  return await prisma.participant.update({
    where: { id: participantId },
    data: { balance: { increment: amount } },
  });
}

export const gamesRepository = {
  createGame,
  getGames,
  getGameId,
  findBetsByGameId,
  finishGame,
  updateBetStatusAndAmountWon,
  updateParticipantBalance,
  searchBetsByGameId,
};
