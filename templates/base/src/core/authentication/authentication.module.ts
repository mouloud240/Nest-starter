import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalGuard } from './guards/local.guard';
import { GoogleGuard } from './guards/oauth/google.guard';
import { GoogleStrategy } from './strategies/oauth/google.strategy';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './v1/authentication.controller';
import { AuthenticationService } from './v1/authentication.service';
import { SessionAuthGuard } from './guards/session.guard';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    LocalGuard,
    GoogleGuard,
    GoogleStrategy,
    SessionAuthGuard,
  ],
  exports: [SessionAuthGuard],
})
export class AuthenticationModule {}
