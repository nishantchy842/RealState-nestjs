import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SignInDto } from './dto/signIn.dto';
import { LocalGuard } from './guard/local.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JoiValidationPipe } from 'src/common/CustomePipe/joiValidation.pipe';
import { REGISTER_VALIDATION } from 'src/users/validation-joi/userValidation.schema';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  @ApiBody({ type: SignInDto })
  async login(@Req() req: Request) {
    console.log(req.user, 'login');
    return await this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: 'register user' })
  @UsePipes(new JoiValidationPipe(REGISTER_VALIDATION))
  async register(@Body() payload: CreateUserDto) {
    return await this.authService.register(payload);
  }
}
