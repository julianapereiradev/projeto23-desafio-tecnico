export type ParticipantProtocol = {
  name: string;
  balance: number;
};

export type GameProtocol = {
  homeTeamName: string;
  awayTeamName: string;
};

export type BetProtocol = {
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
};

export type FinalScoreProtocol = {
  homeTeamScore: number;
  awayTeamScore: number;
};
