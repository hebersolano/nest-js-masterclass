import { Global, Module } from '@nestjs/common';
import { HelpersService } from './helpers-providers/helpers.service';

@Global()
@Module({
  providers: [HelpersService],
  exports: [HelpersService],
})
export class HelpersModule {}
