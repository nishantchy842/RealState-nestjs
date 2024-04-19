import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }
  async validate(payload: any): Promise<any> {
    try {
      return await payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
