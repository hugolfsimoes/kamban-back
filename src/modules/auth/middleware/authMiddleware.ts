// src/shared/middleware/authMiddleware.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { TokenPayload, verifyToken } from '../../../shared/adapters/jwtAdapter';


export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Token missing' });
    return;
  }

  const [ , token ] = authHeader.split(' ');
  const { valid, expired, decoded } = verifyToken<TokenPayload>(token);

  if (!valid || !decoded) {
    res
      .status(expired ? 401 : 400)
      .json({ error: expired ? 'Token expired' : 'Invalid token' });
    return;
  }


  (req as AuthRequest).user = decoded;

  next();
};
