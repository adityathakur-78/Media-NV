import { Controller, Get } from '@nestjs/common';

@Controller('user') //Decorators
export class UserController {
  @Get()
  getUser() {
    return 'user data fetched Succesfully!!!';
  }
}
