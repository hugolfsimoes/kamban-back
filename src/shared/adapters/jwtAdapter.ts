import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'defaultSecret';

export interface TokenPayload extends JwtPayload {
  userId: string;
  role?: string;
  organizationId: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(
    payload,
    SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken<T extends JwtPayload = JwtPayload>(
  token: string
): { valid: boolean; expired: boolean; decoded?: T; } {
  try {
    const decoded = jwt.verify(token, SECRET) as T;
    return { valid: true, expired: false, decoded };
  } catch (err) {
    const error = err as VerifyErrors;
    return {
      valid: false,
      expired: error.name === 'TokenExpiredError',
    };
  }
}
