import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../infrastructure/prisma';
import { UserRole } from '../../../generated/prisma';
import { signup as signupService } from '../services/signup';



export default class AuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const { name, email, password, organizationName } = req.body;

      const result = await signupService({ name, email, password, organizationName });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
       const { email, password } = req.body;
       const result = await this.authService.login({ email, password });
       res.status(200).json(result);
     } catch (error) {
       next(error);
     }
   } */
}
