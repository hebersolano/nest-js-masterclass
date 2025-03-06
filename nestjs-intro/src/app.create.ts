import { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig } from "./config/swagger.config";

/**
 * Add nest app middlewares
 * @param app
 */
export function appCreate(app: INestApplication<any>) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // swagger config
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  // cors
  app.enableCors({ origin: "http://localhost:5173" });

  // global interceptors
  // In order for DataResponseInterceptor to have access to configModule, need to be applied on AppModule
  // app.useGlobalInterceptors(new DataResponseInterceptor());
}
