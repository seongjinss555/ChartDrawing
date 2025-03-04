import { Controller, Body, Get, Post } from '@nestjs/common';
import { CreateUserDto} from '../user/user.dto';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){} // AuthService 주입받음

    @Post('register')
    async register(@Body() userDto: CreateUserDto){
        return await this.authService.register(userDto);
    }
}
