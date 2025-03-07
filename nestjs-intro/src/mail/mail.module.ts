import { MailerModule, MailerOptions } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailService } from "./mail-providers/mail.service";
import { join } from "node:path";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): MailerOptions => {
        console.log(
          ">>test mail config: ",
          config.get<string>("appConfig.mailHost"),
        );
        return {
          transport: {
            host: config.get<string>("appConfig.mailHost"),
            secure: false,
            port: 2525,
            auth: {
              user: config.get<string>("appConfig.smtpUsername"),
              pass: config.get<string>("appConfig.smtpPassword"),
            },
            logger: true,
            // debug: true,
          },
          defaults: {
            from: `My nestjs blog <no-reply@my-blog.com>`,
          },
          template: {
            dir: join(__dirname, "templates"),
            adapter: new EjsAdapter({
              inlineCssEnabled: true,
            }),
            options: {
              strict: false,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
