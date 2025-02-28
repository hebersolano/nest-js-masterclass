import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiHeaders } from "@nestjs/swagger";
import { UploadsService } from "./uploads-providers/uploads.service";
import { Auth } from "src/auth/auth-decorators/auth.decorator";
import { AuthType } from "src/auth/auth-enums/auth-type.enum";

@Controller("uploads")
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @ApiHeaders([
    { name: "Content-Type", description: "multipart/form-data" },
    { name: "Authorization", description: "Bearer Token" },
  ])
  @UseInterceptors(FileInterceptor("file"))
  @Post("file")
  @Auth(AuthType.None)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log("file res", file);
    return this.uploadsService.uploadFile(file);
  }
}
