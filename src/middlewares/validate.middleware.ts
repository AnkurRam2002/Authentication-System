import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../utils/appError';

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      return next(
        new AppError(
          `Validation error: ${err.errors.map((e: any) => e.message).join(', ')}`,
          400
        ));
    }
  };
