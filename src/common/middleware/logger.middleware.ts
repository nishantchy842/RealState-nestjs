import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { EnvList } from 'src/config/orm.config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers['authorization'], 'middleware');

    const authheader = await req.headers['authorization'];

    const token = await authheader.split(' ')[1];

    const decodeToke = await this.jwtService.verify(token, {
      secret: this.configService.get<string>(EnvList.JWT_SECRET_KEY),
    });

    console.log(decodeToke);

    next();
  }
}
