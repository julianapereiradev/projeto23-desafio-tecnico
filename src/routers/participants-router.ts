import { Router } from 'express';

//import { createParticipantSchema } from '../schemas';
import { validateBody } from '../middlewares';
import { createParticipantSchema } from '../schemas';
import { getParticipant, postParticipant } from '../controllers/participants-controller';
//import { participantPost } from '../controllers';

const participantsRouter = Router();

participantsRouter.post('/', validateBody(createParticipantSchema), postParticipant);
participantsRouter.get('/', validateBody(createParticipantSchema), getParticipant);

export { participantsRouter };
