import { Injectable, RequestTimeoutException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";

@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}

  async fileUpload(file: Express.Multer.File) {
    const s3 = new S3();
    try {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get("appConfig.awsBucketName")!,
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();
      console.log(uploadResult);
      return uploadResult;
    } catch {
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
