import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { getMessage } from "./message-utils";
import quotesRouter from "./api/v1/quotes";
import authRouter from "./api/v1/auth";
import cors from "cors";
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    preflightContinue: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send(getMessage());
});

app.use("/api/v1/quotes", quotesRouter);
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  console.log(
    `Server is running 🚀 at http://localhost:${port}\n'Cmd + click' the link above ☝️ to open it in the browser.`,
  );
});
