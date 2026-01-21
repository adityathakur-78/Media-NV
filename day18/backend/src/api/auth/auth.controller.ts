import { Body, Controller, Post, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { apiResponse } from 'src/common/response/api-response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getAuthUser(@Req() req) {
    const user = await this.userService.getUserById(req.user.userId);
    return new apiResponse(true, 'User fetched Successfully', user);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    return new apiResponse(true, 'User registered Successfully', user);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.login(dto);
    return new apiResponse(true, 'User Login Successfull', user);
  }
}
