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

    async validateUser(email: string, password: string) {
        const user = await this.userService.getUser(email); // email로 사용자 조회
    
        if (!user) {
            return null; // 사용자가 없으면 null 반환
        }
        const { password: hashedPassword, ...userInfo } = user; // password 따로 뽑아냄
        // hashedPassword가 유효한지 확인
        if (!hashedPassword) {
            throw new Error('유효한 비밀번호가 아닙니다.'); // 비밀번호가 없을 경우 에러 처리
        }
        // 비밀번호 검증
        if (bcrypt.compareSync(password, hashedPassword)) {
            return userInfo; // 비밀번호가 일치하면 사용자 정보 반환
        }
    
        return null; // 비밀번호 불일치
    }
    
}
