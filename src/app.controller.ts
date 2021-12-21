import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UsersService } from 'src/users/users.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req) {
    return req.user;
  }

  @Post('/api/users/signup')
  async registration(@Body() body) {
    return await this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/api/users/profile')
  async getProfile(@Req() req) {
    return req.user;
  }
}
