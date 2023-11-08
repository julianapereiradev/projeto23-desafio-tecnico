import { Router } from 'express';
import { validateBody } from '../middlewares/validation-middleware';
import { createBetSchema } from '../schemas/bets-schemas';
import { postBet } from '../controllers/bets-controller';

const betsRouter = Router();

betsRouter.post('/', validateBody(createBetSchema), postBet);

export default betsRouter;
