import { Controller, Body, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private userService: UserService){};

    @Put("/update/:email")
    updateUser(@Param('email')email: string, @Body()user: User){
        return this.userService.updateUser(email, user);
    }
}
