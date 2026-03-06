import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class GlobalValidationWithSourcePipe extends ValidationPipe {
  private currentMetadata: ArgumentMetadata | null = null;

  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,

      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map((error) => {
          const constraints = error.constraints
            ? Object.values(error.constraints).join(', ')
            : 'Validation failed';
          return `${error.property}: ${constraints}`;
        });
        const source = this.currentMetadata
          ? `Source: ${this.currentMetadata.type} - ${this.currentMetadata.data}`
          : 'Source: unknown';
        return new BadRequestException({
          message: 'Validation failed',
          errors: errorMessages,
          source,
        });
      },
    });
  }

  override async transform(value: any, metadata: ArgumentMetadata) {
    this.currentMetadata = metadata;
    try {
      return await super.transform(value, metadata);
    } finally {
      this.currentMetadata = null;
    }
  }
}
