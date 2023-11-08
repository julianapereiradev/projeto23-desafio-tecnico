import { notFoundException } from "../errors/errors";
import { FinalScoreProtocol, GameProtocol} from "../protocols";
import { gamesRepository } from "../repositories/games-repository";


async function postGames(game: GameProtocol) {
  const resultPostGame = await gamesRepository.createGame(
    game
  );

  return resultPostGame;
}


async function getGames() {
  const resultGetGame = await gamesRepository.getGames();
  if (resultGetGame.length === 0)
    throw notFoundException("Não há jogos cadastrados");
  return resultGetGame;
}


async function getBetsByGame(gameId: number) {
  const betsByGame = await gamesRepository.findBetsByGameId(gameId);
  if (!betsByGame) throw notFoundException("Esse id de jogo não existe no banco");;

  return betsByGame;
}


async function finishGame(gameId: number, finalScore: FinalScoreProtocol) {
  const updatedGame = await gamesRepository.finishGame(gameId, finalScore);
  return updatedGame;
}


async function calculateAndUpdateBets(gameId: number, finalScore: FinalScoreProtocol) {
  const bets = await gamesRepository.searchBetsByGameId(gameId);

  if (!bets) {
    throw notFoundException("Apostas para este jogo não encontradas.");
  }

  const winningBets = bets.filter((bet) => bet.homeTeamScore === finalScore.homeTeamScore && bet.awayTeamScore === finalScore.awayTeamScore);
  const totalWinningAmount = winningBets.reduce((total, bet) => total + bet.amountBet, 0);
  const totalBetAmount = bets.reduce((total, bet) => total + bet.amountBet, 0);

  for (const bet of bets) {
    const { homeTeamScore, awayTeamScore, amountBet, participantId, status } = bet;

    const isCorrectBet = homeTeamScore === finalScore.homeTeamScore && awayTeamScore === finalScore.awayTeamScore;

    const houseFee = 0.3;
    const wonAmount = isCorrectBet
      ? Math.floor((amountBet / totalWinningAmount) * totalBetAmount * (1 - houseFee))
      : 0;

    await gamesRepository.updateBetStatusAndAmountWon(bet.id, isCorrectBet ? 'WON' : 'LOST', wonAmount);

    if (isCorrectBet) {
      await gamesRepository.updateParticipantBalance(participantId, wonAmount);
    }
  }
}


const gameService = {
  postGames,
  getGames,
  getBetsByGame,
  finishGame,
  calculateAndUpdateBets
};

export default gameService;
