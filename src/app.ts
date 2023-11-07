import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { handleApplicationErrors } from './middlewares';
import { loadEnv, connectDb, disconnectDB } from './database';
import { betsRouter, gamesRouter, participantsRouter } from './routers';

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!!!'))
  .use('/participants', participantsRouter)
  .use('/games', gamesRouter)
  .use('/bets', betsRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
