import { Controller, Body, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
@Controller('user')
export class UserController {
    constructor(private userService: UserService){};
    
    @Post('/create')
    createUser(@Body() user: User){
        return this.userService.createUser(user);
    } // user 생성  

    @Get('/getUser/:email')
    async getUser(@Param('email') email: string){
        const user = await this.userService.getUser(email);
    } // 해당 유저 찾기

    @Put('/update/:email')
    updateUser(@Param('email') email:string, @Body() user: User){
        return this.userService.updateUser(email, user);
    }

    @Delete('/delete/:email')
    deleteUser(@Param('email')email: string){
        return this.userService.deleteUser(email);
    }
       
}
