import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './core/exceptionFilters/http-exception.filter';
import { GlobalValidationWithSourcePipe } from './core/utils/global-validation-with-source';
import { CustomResponseInterceptor } from './core/interceptors/response.interceptors';
import { JsonSyntaxExceptionFilter } from './core/exceptionFilters/syntax-exception.filter';
import { AllExceptionsFilter } from './core/exceptionFilters/all-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
