import { Router } from 'express';

//import { createParticipantSchema } from '../schemas';
import { validateBody } from '../middlewares';
//import { participantPost } from '../controllers';

const participantRouter = Router();

//participantRouter.post('/', validateBody(createParticipantSchema), participantPost);

export { participantRouter };
