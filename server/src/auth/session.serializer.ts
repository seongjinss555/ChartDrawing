import {Injectable} from '@nestjs/common';
import {PassportSerializer} from '@nestjs/passport';
import {UserService} from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer{
    constructor(private userService: UserService){
        super();
    } // userService 주입

    serializeUser(user: any, done:(error:Error | null, user:any)=>void): any{
        done(null, user.email);// 세션에 저장할 정보
    }

    async deserializeUser(
        payload: any,
        done: (err:Error | null, payload: any)=> void,
    ): Promise<any>{
        const user = await this.userService.getUser(payload);

        if(!user){
            done(new Error('유저가 없습니다.'), null);
            return;
        }
        const {password, ...userInfo} = user;

        done(null, userInfo);
    }
}
