import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not set in environment variables');
}

export const signToken = (userId: number, userRole: string): string => {
  const payload = { id: userId, role: userRole }; // You can add more fields to the payload as needed

  const options: SignOptions = {
  expiresIn: '7d',
};

  return jwt.sign(payload, JWT_SECRET, options);
};
