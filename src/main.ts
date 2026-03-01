import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './core/exceptionFilters/all-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  app.useGlobalFilters(new AllExceptionFilter());
  app.setGlobalPrefix('api');
 console.log(`Listening on http://0.0.0.0:${process.env.PORT ?? 3000}`);
}
bootstrap();
