import { notFoundException } from "../errors/errors";
import { GameProtocol} from "../protocols";
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


const gameService = {
  postGames,
  getGames,
  getBetsByGame
};

export default gameService;
