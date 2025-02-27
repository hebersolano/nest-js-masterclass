import { Module } from "@nestjs/common";
import { UploadsController } from "./uploads.controller";
import { UploadsService } from "./uploads-providers/uploads.service";
import { UploadToAwsProvider } from "./uploads-providers/upload-to-aws.provider";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadEntity } from "./upload.entity";

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, UploadToAwsProvider],
  imports: [TypeOrmModule.forFeature([UploadEntity])],
})
export class UploadsModule {}
