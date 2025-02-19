import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './user/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', //database type
      database: 'chartjs.sqlite', // database 파일명
      entities: [User], //엔티티 리스트
      synchronize: true,//데이터베이스에 스키마를 동기화
      logging: true,//sql 실행 로그 확인
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
