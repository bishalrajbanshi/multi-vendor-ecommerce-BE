import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './core/exceptionFilters/all-exception-filter';

async function bootstrap() {

  app.useGlobalFilters(
    new AllExceptionFilter(),
  )


  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);


}


bootstrap();
