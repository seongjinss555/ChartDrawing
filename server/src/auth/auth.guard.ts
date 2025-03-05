import {CanActivate, ExecutionContext,Injectable} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthGuard} from '@nestjs/passport';
import { Observable } from 'rxjs';

// @Injectable()
// export class LoginGuard implements CanActivate{
//     constructor(private authService: AuthService){} //auth service 주입받음

//     async canActivate(context: any):Promise<boolean>{
//         const request = context.swtichToHttp().getRequest();

//         if(request.cookies['login']){
//             return true;
//         }

//         if(!request.body.email || !request.body.password){
//             return false;
//         }//쿠키가 없으면 request의 body 정보 확인

//         const user = await this.authService.validateUser(
//             request.body.email,
//             request.body.password,
//         );

//         if(!user){
//             return false;
//         }
//         // 유저 정보가 있으면 request에 user 정보 추가하고 true 반환
//         request.user=user;
//         return true;
//     }//CanActivate 인터페이스 메서드
// }

// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local'){
//     async canActivate(context: any): Promise<boolean>{
//         const result = (await super.canActivate(context)) as boolean;
//         //로컬 스트래트지 실행
//         const request = context.swtichToHttp().getRequest();
//         await super.logIn(request); // 세션에 저장
//         return result;
//     }
// }

// @Injectable()
// export class AuthenticatedGuard implements CanActivate{
//     canActivate(context: ExecutionContext): boolean {
//         const request = context.switchToHttp().getRequest();
//         return request.isAuthenticated(); //세션에서 정보를 읽어서 인증 확인
//     }
// }

@Injectable()
//google strategy 사용
export class GoogleAuthGuard extends AuthGuard('google'){
    async canActivate(context: any): Promise<boolean>{
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}
