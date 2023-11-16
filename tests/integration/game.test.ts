import httpStatus from "http-status";
import supertest from "supertest";
import app, { init } from "../../src/app";
import { cleanDb } from "../helpers/helpers";
import {
  addFinishedGame,
  addGame,
  createGame,
} from "../factories/games-factory";

const server = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

describe("POST /games", () => {
  it("should return 400 when body is with invalid format", async () => {
    const response = await server.post("/games").send({});
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return 201 when body is valid", async () => {
    await addGame();
    const response = await server.post("/games").send(createGame());

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamName: expect.any(String),
        awayTeamName: expect.any(String),
        homeTeamScore: 0,
        awayTeamScore: 0,
        isFinished: false,
      })
    );
  });
});

describe("GET /games", () => {
  it("should return 404 when array is empty", async () => {
    const response = await server.get("/games").send([]);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should return 200 with all participants", async () => {
    await addGame();
    const response = await server.get("/games");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          homeTeamName: expect.any(String),
          awayTeamName: expect.any(String),
          homeTeamScore: 0,
          awayTeamScore: 0,
          isFinished: false,
        }),
      ])
    );
  });
});

describe("games /GET by id route", () => {
  it("should return 404 when there is no game for this id", async () => {
    const response = await server.get("/games/126677");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should return 200 with the game/:id", async () => {
    const game = await addGame();
    const response = await server.get(`/games/${game.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: game.id,
        createdAt: game.createdAt.toISOString(),
        updatedAt: game.updatedAt.toISOString(),
        homeTeamName: game.homeTeamName,
        awayTeamName: game.awayTeamName,
        homeTeamScore: game.homeTeamScore,
        awayTeamScore: game.awayTeamScore,
        isFinished: game.isFinished,
        bets: expect.any(Array),
      })
    );
  });
});

describe("POST /games/:id/finish", () => {
  it("should return 409 when trying to finish a non-existing game", async () => {
    const response = await server.post("/games/999/finish").send({
      homeTeamScore: 2,
      awayTeamScore: 1,
    });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should return 409 when trying to finish an already finished game", async () => {
    const finishedGame = await addFinishedGame();
    const response = await server
      .post(`/games/${finishedGame.id}/finish`)
      .send({
        homeTeamScore: 2,
        awayTeamScore: 1,
      });

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it("should return 400 when trying to finish a game with invalid final score", async () => {
    const game = await addGame();
    const response = await server.post(`/games/${game.id}/finish`).send({
      homeTeamScore: "invalid",
      awayTeamScore: 1,
    });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return 200 and update the game as finished with valid final score", async () => {
    const game = await addGame();
    const response = await server.post(`/games/${game.id}/finish`).send({
      homeTeamScore: 2,
      awayTeamScore: 1,
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: game.id,
        isFinished: true,
        homeTeamScore: 2,
        awayTeamScore: 1,
      })
    );
  });
});
