import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dtos/auth.dto';




@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  public async loginUser(@Body() loginUserDto: LoginUserDto): Promise<string> {
    const { email, password } = loginUserDto
    return this.authService.loginUser(email, password);
  }
  @Post("register")
  public async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<string> {
    let { name, email, password } = registerUserDto;
    return this.authService.registerUser(name, email, password);
  }
}
