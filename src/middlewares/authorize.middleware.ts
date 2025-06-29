import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthenticatedRequest).user;

    if (!user) {
      return next(new AppError('Unauthorized: No user found', 401));
    }

    if (!roles.includes(user.role)) {
      return next(new AppError('Forbidden: You do not have permission to access this resource', 403));
    }

    next();
  };
};
