import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { GoogleAuthGuard } from './auth.guard'; // GoogleAuthGuard 경로 확인
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    @UseGuards(GoogleAuthGuard)
    @Get('to-google')
    async googleAuth(@Req() req: Request) {
        // 필요한 로직 추가
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google')
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        const {user} = req;
        return res.send(user); 
    }
}
