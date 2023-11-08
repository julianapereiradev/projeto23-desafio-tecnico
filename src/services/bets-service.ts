import { participantsRepository } from "../repositories/participants-repository";
import { betAlreadyRegistered, gameAlreadyFinished, insufficientFunds, notFoundException } from "../errors/errors";
import { BetProtocol } from "../protocols";
import { betsRepository } from "../repositories/bets-repository";
import { gamesRepository } from "../repositories/games-repository";

async function postBets(betData: BetProtocol) {

    const participant = await participantsRepository.getParticipantId(betData.participantId);
    if (!participant) throw notFoundException("Não existe esse participante no banco de dados");

    const game = await gamesRepository.getGameId(betData.gameId);
    if (!game) throw notFoundException("Não existe esse jogo cadastrado no banco de dados");

    if (game.isFinished) throw gameAlreadyFinished("Não pode fazer aposta em um jogo já finalizado!"); //só vou conseguir validar depois

    const bet = await betsRepository.isBetAlreadyRegistered(game.id, participant.id);
    if (bet) throw betAlreadyRegistered("Você já fez uma aposta nesse jogo!")

    if (participant.balance < betData.amountBet) throw insufficientFunds("O valor da sua aposta excede o seu saldo!");

    await participantsRepository.subtractingBalanceAfterBet(participant.id, betData.amountBet);

  const resultPostBet = await betsRepository.createBet(betData);
  return resultPostBet;
}


const betService = {
  postBets,
};

export default betService;