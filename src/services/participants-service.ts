//import { Game } from "../protocols";
import { forbiddenError, notFoundError } from '../errors';
import { ParticipantProtocol } from "../protocols";
import { participantsRepository } from '../repositories';


async function postParticipants(participant: ParticipantProtocol) {

  const resultPostParticipant = await participantsRepository.createParticipant(participant);
return resultPostParticipant
}


const participantService = {
  postParticipants,
};


export default participantService;