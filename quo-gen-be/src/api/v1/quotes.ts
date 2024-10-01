import { Router } from "express";
import { QUOTES_LIST, Quote } from "../../data/quotes";
import {
  getMultipleRandomQuotes,
  getRandomQuote,
} from "../../utils/quotes-helper";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/random", authMiddleware, async (req, res) => {
  try {
    if (!req.query.results) {
      const randomQuote = getRandomQuote<Quote>(QUOTES_LIST);
      res.json({
        quote: randomQuote,
      });
    } else {
      const quotes = getMultipleRandomQuotes<Quote>(
        QUOTES_LIST,
        Number(req.query.results),
      );
      res.json({
        quotes: quotes,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all users" });
  }
});

export default router;
