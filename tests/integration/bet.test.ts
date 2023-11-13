import httpStatus from "http-status";
import supertest from "supertest";
import app, { init } from "../../src/app";
import { cleanDb } from "../helpers/helpers";
import { addParticipant } from "../factories/participants-factory";
import { addFinishedGame, addGame } from "../factories/games-factory";
import { createBet } from "../factories/bets-factory";

const server = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

describe("POST /bet", () => {
  it("should return 404 if participant doesn't exist", async () => {
    const game = await addGame();
    const response = await server
      .post("/bets")
      .send(createBet(game.id, 55, 1500));
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should return 404 if game doesn't exist", async () => {
    const participant = await addParticipant();
    const response = await server
      .post("/bets")
      .send(createBet(47, participant.id, 2300));
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should return 409 if game is already finished", async () => {
    const participant = await addParticipant();
    const game = await addFinishedGame();
    const response = await server
      .post("/bets")
      .send(createBet(game.id, participant.id, participant.balance - 100));
    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should return 400 if participant has insuficient balance to bet", async () => {
    const participant = await addParticipant();
    const game = await addGame();
    const response = await server
      .post("/bets")
      .send(createBet(game.id, participant.id, participant.balance + 8500));
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return 201 with bet created", async () => {
    const participant = await addParticipant();
    const game = await addGame();
    const response = await server
      .post("/bets")
      .send(createBet(game.id, participant.id, participant.balance - 1200));
    expect(response.status).toBe(httpStatus.CREATED);
  });
});
