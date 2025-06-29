import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma';
import { signToken } from '../utils/jwt';
import { AppError } from '../utils/appError';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';


export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return next(new AppError('User already exists', 400));
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = signToken(user.id, user.role);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(new AppError('Invalid credentials', 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError('Invalid credentials', 400));
    }

    const token = signToken(user.id, user.role);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const getMe = (req: Request, res: Response) => {
  const { id, name, email, role, createdAt } = (req as AuthenticatedRequest).user || {};
  res.status(200).json({ id, name, email, role, createdAt });
  return;
};
