import { Router } from 'express';
import { validateBody } from '../middlewares/validation-middleware';
import { createFinalScoreSchema, createGameSchema } from '../schemas/games-schemas';
import { postGame, getGames, getAllBetsByGameId, finishGame } from '../controllers/games-controller';

const gamesRouter = Router();

gamesRouter.post('/', validateBody(createGameSchema), postGame);
gamesRouter.get('/', getGames);
gamesRouter.get('/:id', getAllBetsByGameId);
gamesRouter.post('/:id/finish', validateBody(createFinalScoreSchema),finishGame);


export default gamesRouter;
