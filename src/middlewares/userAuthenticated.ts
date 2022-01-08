import { NextFunction, Request, Response } from "express";

interface ITokenPayload{
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
  sub: string;
}

export default function userAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {

}
