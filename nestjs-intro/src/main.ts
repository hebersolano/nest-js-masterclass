import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { swaggerConfig } from "./config/swagger.config";
import { ConfigService } from "@nestjs/config";
import { config as awsConfig } from "aws-sdk";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  // aws config
  const configService = app.get(ConfigService);
  awsConfig.update({
    credentials: {
      accessKeyId: configService.get("appConfig.awsAccessKeyId")!,
      secretAccessKey: configService.get("appConfig.awsAccessKeySecret")!,
    },
    region: configService.get("appConfig.awsRegion"),
  });

  // cors
  app.enableCors({ origin: "http://localhost:5173" });

  // global interceptors
  // In order for DataResponseInterceptor to have access to configModule, need to be applied on AppModule
  // app.useGlobalInterceptors(new DataResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
