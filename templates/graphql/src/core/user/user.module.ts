import { Module } from '@nestjs/common';
import { UserController } from './v1/user.controller';
import { UserService } from './v1/user.service';
import { USER_REPOSITORY } from './repository/user.respository-interface';
import { NoopUserRepository } from './repository/noop-user.repository';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: NoopUserRepository,
    },
    UserResolver,
  ],
  exports: [UserService],
})
export class UserModule {}
