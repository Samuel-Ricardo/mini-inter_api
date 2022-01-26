import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import auth from "../config/auth";
import AppError from "../shared/error/AppError";

interface ITokenPayload{
  first_name: string;
  last_name: string;
  iat: number;
  exp: number;
  sub: string;
}

export default function userAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {

  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('JWT Não enviado', 401);

  const [bearer, token] = authHeader.split('');

  console.log("")
  console.log("pre token: "+token)

  try {

    console.log("ANALISANDO TOKEN")
    console.log("")
    console.log("Token: "+token)


    const decoded = verify(token, auth.jwt.secret);
    const { sub, first_name, last_name } = decoded as ITokenPayload;

    console.log("ANALISANDO TOKEN - 2")
    console.log("")
    console.log(decoded)


    req.user = {
      id: sub,
      first_name,
      last_name
    }
    console.log("")
    console.log(req.user)

    return next();
  } catch {
    throw new AppError('Token JWT Inválido', 401);
  }
}
