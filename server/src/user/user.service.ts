import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable() // 의존성 주입
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {} // 레포 주입

    //유저 생성
    createUser(user: User): Promise<User>{
        return this.userRepository.save(user);
    }

    //해당 유저 찾기
    async getUser(email?: string){
        const result = await this.userRepository.findOne({
            where: {email},
        });
        return result;
    }

    // user update
    async updateUser(email: string, _user: Partial<User>): Promise<void> {
        const user = await this.getUser(email);
        if (!user) {
            throw new Error('User not found'); // null 처리
        }
    
        if (_user.username !== undefined) {
            user.username = _user.username;
        }
        if (_user.password !== undefined) {
            user.password = _user.password;
        }
    
        await this.userRepository.save(user);
    }
    

    //delete
    deleteUser(email: any){
        return this.userRepository.delete({email});
    }
    
}
