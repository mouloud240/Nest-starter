import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalGuard } from './guards/local.guard';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './v1/authentication.controller';
import { AuthenticationService } from './v1/authentication.service';
import { SessionAuthGuard } from './guards/session.guard';
import { CsrfModule } from '../../common/modules/csrf/csrf.module';
import { OAuthStrategyRegistry } from './oauth/oauth-strategy.registry';

@Module({
  imports: [PassportModule, UserModule, CsrfModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    LocalGuard,
    SessionAuthGuard,
    OAuthStrategyRegistry,
  ],
  exports: [SessionAuthGuard],
})
export class AuthenticationModule {}
