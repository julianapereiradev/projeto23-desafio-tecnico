import { Router } from 'express';
import { validateBody } from '../middlewares/validation-middleware';
import { createGameSchema } from '../schemas/games-schemas';
import { postGame, getGames } from '../controllers/games-controller';

const gamesRouter = Router();

gamesRouter.post('/', validateBody(createGameSchema), postGame);
gamesRouter.get('/', getGames );

export default gamesRouter;
