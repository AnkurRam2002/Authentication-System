import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { AppError } from '../utils/appError';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';


export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized: No token provided', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return next(new AppError('Unauthorized: User not found', 401));
    }

    (req as AuthenticatedRequest).user = user; // Attach user to request object

    next();

  } catch (err) {
    return next(new AppError('Invalid token', 401));
  }
};

