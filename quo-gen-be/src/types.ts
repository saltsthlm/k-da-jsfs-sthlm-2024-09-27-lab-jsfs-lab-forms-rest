import jwt from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?: jwt.JwtPayload | string;
  }
}
