import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UploadEntity } from "../upload.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UploadToAwsProvider } from "./upload-to-aws.provider";
import { ConfigService } from "@nestjs/config";
import { mimeTypes } from "../uploads-enum/mime-type.enum";
import { validMimeTypes } from "../constants/valid-mimetypes";

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
    const name = await this.uploadToAwsProvider.fileUpload(file);
    // generate new entry in DB
    const upload = {
      name,
      path: ``,
    };
  }
}
