import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/user-entities/user.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserWelcome(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `Onboarding Team <support@nestjs-blog.com>`,
      subject: "Welcome to NestJs Blog",
      template: "./welcome",
      context: {
        name: user.firstName,
        mail: user.email,
        loginUrl: "http://localhost:3000",
      },
    });
  }
}
