import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findOne(username);

      const comparePass = await bcrypt.compare(pass, user.password);

      if (user && comparePass) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new BadRequestException('Invalid credential');
    }
  }

  async findOne(username: string) {
    return await this.userService.findOne(username);
  }

  //used to create token
  async login(user) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    return {
      data: user,
      token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get('TOKEN_EXPIRATION'),
      }),
    };
  }

  async verifyJwt(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });

      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async register(payload: CreateUserDto) {
    const { email, username } = payload;

    const existedUser = await this.userService.findByEmail(email);

    if (existedUser) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }

    const checkUsername = await this.userService.findOne(username);

    if (checkUsername) {
      throw new HttpException(
        'Username exists try unique username',
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.userService.create(payload);
  }
}
