import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDTO } from './dto/register.dto';
import { ApiResponse } from 'src/common/responses/api-response';
import { loginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: registerDTO) {
    const user = await this.authService.register(dto.email, dto.password);
    return new ApiResponse(true, 'User registered Succesfully', user);
  }

  @Post('login')
  async login(@Body() dto: loginDTO) {
    const result = await this.authService.login(dto.email, dto.password);
    return new ApiResponse(true, 'Login SuccesFull', result);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile() {
    return { message: 'Hey you have acceses the protected route' };
  }
}
