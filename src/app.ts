import Express,{Request, Response} from "express"
import 'express-async-errors';
import cors from "cors"
import participantsRouter from "./routers/participants-router";
import gamesRouter from "./routers/games-router";
import { connectDb } from "./database/database";
import betsRouter from "./routers/bets-router";
import { handleApplicationErrors } from "./middlewares/error-handling-middleware";

connectDb()
const app = Express()
app.use(Express.json())
app.use(cors())
app.get("/health", (req: Request, res: Response) => res.send("OK!!!"));
app.use("/participants", participantsRouter)
app.use("/games", gamesRouter)
app.use("/bets", betsRouter)
app.use(handleApplicationErrors)
export default app