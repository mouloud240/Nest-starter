import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [UserModule, AuthenticationModule, WebSocketModule],
  exports: [UserModule, AuthenticationModule, WebSocketModule],
})
export class CoreModule {}
