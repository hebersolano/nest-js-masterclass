import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { validMimeTypes } from "../constants/valid-mimetypes";
import { UploadEntity } from "../upload.entity";
import { fileTypes } from "../uploads-enum/file-type.enum";
import { UploadToAwsProvider } from "./upload-to-aws.provider";

@Injectable()
export class UploadsService {
  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(UploadEntity)
    private readonly uploadsRepository: Repository<UploadEntity>,

    private readonly uploadToAwsProvider: UploadToAwsProvider,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    // thrown error for invalid mime type
    if (!validMimeTypes.includes(file.mimetype))
      throw new BadRequestException("File type not supported");

    // upload file to AWS s3 bucket
    const fileName = await this.uploadToAwsProvider.fileUpload(file);

    // generate new entry in DB
    try {
      const newUpload = this.uploadsRepository.create({
        name: fileName,
        path: `https://${this.configService.get("appConfig.awsCloundFront")}/${fileName}`,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      });
      return await this.uploadsRepository.save(newUpload);
    } catch (error) {
      console.error("er", error);
      throw new ConflictException();
    }
  }
}
