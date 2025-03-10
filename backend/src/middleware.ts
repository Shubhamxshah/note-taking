import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

const jwt_secret = process.env.jwt || "";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({error: "Unauthorized: no token provided"})
    }

    const decoded = jwt.verify(token, jwt_secret) as {userId: string};

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(403).json({ error: "Unauthorized: Invalid token"});
  }
}
