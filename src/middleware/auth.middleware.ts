import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers && req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await jwt.decode(token);
      req["user"] = payload
      next()

    } catch {
      throw new UnauthorizedException();
    }

  }
}
