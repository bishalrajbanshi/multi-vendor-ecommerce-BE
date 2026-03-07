import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './core/exceptionFilters/http-exception.filter';
import { GlobalValidationWithSourcePipe } from './core/utils/global-validation-with-source';
import { CustomResponseInterceptor } from './core/interceptors/response.interceptors';
import { JsonSyntaxExceptionFilter } from './core/exceptionFilters/syntax-exception.filter';
import { AllExceptionsFilter } from './core/exceptionFilters/all-exception-filter';
import session from 'express-session';
import passport from 'passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', 'public'),
});

  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      saveUninitialized: false,
      resave: false,
      cookie: {
        sameSite: 'none', // Allows cross-site cookies
        secure: false, // Bypass HTTPS requirement (for HTTP testing)
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
      },
    }),
  );

  app.use(passport.initialize());

  app.useGlobalPipes(new GlobalValidationWithSourcePipe());
  app.useGlobalInterceptors(new CustomResponseInterceptor());
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new ValidationExceptionFilter(),
    new JsonSyntaxExceptionFilter(),
  );
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Listening on http://0.0.0.0:${process.env.PORT ?? 3000}`);
}
bootstrap();
