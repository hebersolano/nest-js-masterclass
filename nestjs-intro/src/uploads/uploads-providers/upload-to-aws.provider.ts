import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  Injectable,
  OnModuleInit,
  RequestTimeoutException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";

@Injectable()
export class UploadToAwsProvider implements OnModuleInit {
  private s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.s3Client = new S3Client({
      region: this.configService.get("appConfig.awsRegion"),
      credentials: {
        accessKeyId: this.configService.get("appConfig.awsAccessKeyId")!,
        secretAccessKey: this.configService.get(
          "appConfig.awsAccessKeySecret",
        )!,
      },
    });
  }

  async fileUpload(file: Express.Multer.File) {
    const fileName = this.generateFileName(file);
    try {
      const resUpload = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.get("appConfig.awsBucketName")!,
          Body: file.buffer,
          Key: fileName,
          ContentType: file.mimetype,
        }),
      );
      console.log(">>> upload res", resUpload);
      return fileName;
    } catch (error) {
      console.error("upload error", error);
      throw new RequestTimeoutException("Error saving file");
    }
  }

  private generateFileName(file: Express.Multer.File) {
    // extract file name
    const name = file.originalname.split(".")[0];
    // remove white spaces
    name.replace(/\s/g, "").trim();
    // extract extension
    const extension = extname(file.originalname);
    // return file uuid
    return name + "-" + randomUUID() + extension;
  }
}
