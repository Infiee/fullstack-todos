import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule } from '@nestjs/swagger';
import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from 'shared-api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const openApiDocument = generateOpenApi(contract, {
    info: {
      title: 'Todos API',
      version: '1.0.0',
    },
  });
  SwaggerModule.setup('openapi', app, openApiDocument);

  app.enableCors();

  await app.listen(3000);

  console.log(`服务端运行在 http://localhost:3000`);
}
bootstrap();
