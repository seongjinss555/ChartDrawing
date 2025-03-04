import { HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async register(userDto: CreateUserDto){
        //이미 가입된 유저가 있는지 체크
        const user = await this.userService.getUser(userDto.email);
        if(user){
            throw new HttpException(
                '이미 해당 유저가 존재합니다.',
                HttpStatus.BAD_REQUEST,
            );
        }
        //password 암호화
        const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

        try{
            const user = await this.userService.createUser({
                ...userDto,
                password: encryptedPassword,
            });
            //회원가입 후 반환하는 값에는 password를 주지 않음
            user.password = undefined;
            return user;
        }catch(error){
            throw new HttpException('서버 에러',500);
        }
    }
}
