import { notFoundException } from "../errors/errors";
import { ParticipantProtocol } from "../protocols";
import { participantsRepository } from "../repositories/participants-repository";

async function postParticipants(participant: ParticipantProtocol) {
  const resultPostParticipant = await participantsRepository.createParticipant(
    participant
  );

  return resultPostParticipant;
}

async function getParticipants() {
  const resultGetParticipant = await participantsRepository.getParticipants();
  if (resultGetParticipant.length === 0)
    throw notFoundException("There are no participants in the database");
  return resultGetParticipant;
}

const participantService = {
  postParticipants,
  getParticipants,
};

export default participantService;
