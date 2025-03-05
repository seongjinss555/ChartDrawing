import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {AuthService} from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    //passportstrategy 믹스인
    constructor(private authSerive: AuthService){
        super({
            usernameField: 'email',
            passReqToCallback: true,
        });
    }

    async validate(email: string, password: string): Promise<any>{
        const user = await this.authSerive.validateUser(email, password);
        if(!user){
            return null;
        }
        return user;
    }
}