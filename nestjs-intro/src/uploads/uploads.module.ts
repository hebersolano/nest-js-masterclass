import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Upload } from "./upload.entity";
import { UploadToAwsProvider } from "./uploads-providers/upload-to-aws.provider";
import { UploadsService } from "./uploads-providers/uploads.service";
import { UploadsController } from "./uploads.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Upload])],
  providers: [UploadsService, UploadToAwsProvider],
  controllers: [UploadsController],
})
export class UploadsModule {}
