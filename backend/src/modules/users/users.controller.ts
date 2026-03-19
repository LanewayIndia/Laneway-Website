import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import * as usersService from './users.service';

export async function getAll(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const users = await usersService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
}

export async function getRoles(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const roles = await usersService.getRoles();
    res.json({ success: true, data: roles });
  } catch (error) {
    next(error);
  }
}
