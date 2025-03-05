import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from '../user/user.module';
import {GoogleStrategy} from '../auth/google.strategy';
import {LocalStrategy} from './local.strategy';
import {SessionSerializer} from './session.serializer';

@Module({
  imports: [UserModule],
  providers: [AuthService, GoogleStrategy, LocalStrategy, SessionSerializer],
  controllers: [AuthController]
})
export class AuthModule {}
