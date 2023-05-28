import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { ValidationException } from '../../src/common/exceptions/validation-exceptions';

export const getTestsApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      exceptionFactory: (errors) => {
        const customErrors = errors.map((e) => {
          const firstError = JSON.stringify(e.constraints);
          return { field: e.property, message: firstError };
        });
        throw new BadRequestException(customErrors);
      },
    }),
  );
  app.useGlobalFilters(new ValidationException());
  await app.init();

  return app;
};
