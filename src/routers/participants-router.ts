import { Router } from 'express';

import { validateBody } from '../middlewares/validation-middleware';
import { createParticipantSchema } from '../schemas/participants-schemas';
import { getParticipant, postParticipant } from '../controllers/participants-controller';

const participantsRouter = Router();

participantsRouter.post('/', validateBody(createParticipantSchema), postParticipant);
participantsRouter.get('/', getParticipant);

export default participantsRouter;
