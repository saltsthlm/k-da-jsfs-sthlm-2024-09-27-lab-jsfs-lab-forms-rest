import { Router } from "express";
import { compareSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "../../types";
import { ZodError, z } from "zod";
import { SECRET_KEY } from "../../middlewares/auth.middleware";
import { db } from "./users";

export type User = {
  username: string;
  password: string;
};

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const users: User[] = db;

const router = Router();

router.post("/login", async (req, res) => {
  userSchema.parse(req.body);
  const { username, password } = req.body;
  const user = users.find((user) => {
    return user.username === username;
  });
  if (!user) {
    return res.status(401).json({
      message: "Username or password incorrect",
    });
  }

  //if (compareSync(password, user.password)) {
  if (password === user.password) {
    const token = sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // we need to use the token to set the cookies here

    res.cookie('quotesAuthToken', token, {
      httpOnly: true,
      maxAge: 3000000,
    });
    
    res.status(200).json({
      user: {
        username: user.username,
      },
      token
    });
  } else {
    return res.status(401).json({
      message: "Username or password incorrect",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    userSchema.parse(req.body);
    const { username, password } = req.body;
    const user = users.find((user) => {
      return user.username === username;
    });
    if (user) {
      return res.status(406).json({
        message: "User already exists",
      });
    }

    const hashedPassword = hashSync(password, 10);
    users.push({
      username,
      password: hashedPassword,
    });
    const token = sign({ username: username }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie("quotesAuthToken", token, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.status(200).json({
      user: {
        username,
      },
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
});

router.get("/logout", (_req, res) => {
  throw new Error("Not implemented");
});

export default router;
