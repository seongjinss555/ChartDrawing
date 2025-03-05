import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // validation pipe import
  app.use(
    session({
      secret: 'very-important-secret',
      resave: false, // session을 항상 저장할지 여부
      saveUninitialized: false, // session이 저장되기 전에는 초기화지 않은 상태로 세션을 미리 만들어 저장
      cookie: {maxAge: 3600000},
    })
  );
  //initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
