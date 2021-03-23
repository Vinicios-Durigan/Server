// Verifica se o Usuario está autenticado na aplicação atravez do Token JWT
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  //validacão do token jwt

  const authHeader = request.headers.authorization;

  //se não existir
  if (!authHeader) {
    throw new Error('JTW token is missing')
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    }
    return next();
  } catch (err) {
     throw new Error('Invalid JTW token')
  }


  
}