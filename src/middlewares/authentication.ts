import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../shared/types";
import { authRepo } from "../features/auth/repositories";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const cookieToken = JSON.parse(req.cookies["session-token"] ?? null);
  const cookieToken = req.cookies["session-token"];
  const token = req.header("x-access-token") ?? cookieToken;
  if (!token)
    return res.status(401).json({ detail: "Unauthorized - Token missing" });
  try {
    req.headers = { ...req.headers, "x-access-token": token };
    const user = await authRepo.getUserByToken(token);
    (req as UserRequest).user = user;
    return next();
  } catch (err: any) {
    next(err);
  }
};

export const authenticateOptional = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const cookieToken = JSON.parse(req.cookies["session-token"] ?? null);
  const cookieToken = req.cookies["session-token"];
  const token = req.header("x-access-token") ?? cookieToken;
  if (!token) return next();
  try {
    req.headers = { ...req.headers, "x-access-token": token };
    const user = await authRepo.getUserByToken(token);
    (req as UserRequest).user = user;
    return next();
  } catch (err: any) {
    return next();
  }
};
