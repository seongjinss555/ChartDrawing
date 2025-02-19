import { IsEmail, IsString } from "class-validator";    

//email, password, username field 생성
export class CreateUserDto {
    @IsEmail()
    email?: string;

    @IsString()
    password?: string;

    @IsString()
    username?: string;
}

//update 유효성 검증 시 사용할 dto
export class UpdateUserDto{
    @IsString()
    username?: string;

    @IsString()
    password?: string;
}