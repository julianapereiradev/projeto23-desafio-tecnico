import { participantsRepository } from "../repositories/participants-repository";
import {
  gameAlreadyFinished,
  insufficientFunds,
  notFoundException,
} from "../errors/errors";
import { BetProtocol } from "../protocols";
import { betsRepository } from "../repositories/bets-repository";
import { gamesRepository } from "../repositories/games-repository";

async function postBets(betData: BetProtocol) {
  const participant = await participantsRepository.getParticipantId(betData.participantId);
  if (!participant)
    throw notFoundException("There is no such participant in the database");

  const game = await gamesRepository.getGameId(betData.gameId);
  if (!game)
    throw notFoundException("There is no such game registered in the database");

  if (game.isFinished)
    throw gameAlreadyFinished("You cannot place a bet on a game that has already finished!");

  if (participant.balance < betData.amountBet)
    throw insufficientFunds("Your bet amount exceeds your balance!");

  await participantsRepository.subtractingBalanceAfterBet(participant.id, betData.amountBet);
  const resultPostBet = await betsRepository.createBet(betData);
  return resultPostBet;
}

const betService = {
  postBets,
};

export default betService;
