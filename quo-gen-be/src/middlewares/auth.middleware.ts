import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const SECRET_KEY = "salt_recipe";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.quotesAuthToken;

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
