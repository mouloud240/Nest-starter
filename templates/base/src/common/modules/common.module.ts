import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AlsModule } from './async_storage/als.module';
import { CsrfModule } from './csrf/csrf.module';

@Module({
  imports: [MailerModule, AlsModule, CsrfModule],
  exports: [MailerModule, AlsModule, CsrfModule],
})
export class CommonModule {}
