import "reflect-metadata";
import "express-async-errors";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import participantsRouter from "./routers/participants-router";
import gamesRouter from "./routers/games-router";
import { connectDb, disconnectDB } from "./database/database";
import betsRouter from "./routers/bets-router";
import { handleApplicationErrors } from "./middlewares/error-handling-middleware";
import { loadEnv } from "./database/envs";

loadEnv();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (req: Request, res: Response) => res.send("OK!!!"));
app.use("/participants", participantsRouter);
app.use("/games", gamesRouter);
app.use("/bets", betsRouter);
app.use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
