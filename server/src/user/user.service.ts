import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable() //의존성 주입
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){} // 레포 주입
    
    createUser(user): Promise<User>{
        return this.userRepository.save(user);
    }

    async getUser(email: string){
        const result = await this.userRepository.findOne({
            where: {email},
        });
        return result;
    } // 한 명의 유저 찾기

    async updateUser(email, _user){
        const user: User = await this.getUser(email);
        console.log(_user);
        user.username = _user.username;
        user.password = _user.password;
        console.log(user);
        this.userRepository.save(user);
    } // 유저 정보 업데이트, username, password만 변경

    deleteUser(email: any){
        return this.userRepository.delete({email});
    }
}
