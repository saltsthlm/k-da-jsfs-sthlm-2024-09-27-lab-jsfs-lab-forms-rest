import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import quotesRouter from "./quotes";
import { MOCK_QUOTES } from "../../mocks/mock-quotes";
import { Quote } from "../../data/quotes";

const app = express();
app.use("/api/v1/quotes", quotesRouter);

jest.mock("../../middlewares/auth.middleware", () => ({
  authMiddleware: (_req: Request, _res: Response, next: NextFunction) => {
    next();
  },
}));

jest.mock("../../utils/quotes-helper", () => ({
  getMultipleRandomQuotes: () => {
    return [MOCK_QUOTES[0], MOCK_QUOTES[1]];
  },
  getRandomQuote: () => {
    return MOCK_QUOTES[1];
  },
}));

describe("Quotes API", () => {
  it("should fetch a random quote", async () => {
    const response = await request(app).get("/api/v1/quotes/random");
    expect(response.status).toBe(200);
    const { quote } = response.body;
    expect(quote).toBeTruthy();
    expect(quote).toEqual(MOCK_QUOTES[1]);
  });

  it("should get random quotes using results query", async () => {
    const response = await request(app).get("/api/v1/quotes/random?results=2");
    expect(response.status).toBe(200);
    const quotes = response.body.quotes as Quote[];
    expect(quotes.length).toBe(2);
    expect(quotes[0]).toEqual(MOCK_QUOTES[0]);
    expect(quotes[1]).toEqual(MOCK_QUOTES[1]);
  });
});
