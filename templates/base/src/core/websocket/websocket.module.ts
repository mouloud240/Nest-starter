import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { WsConnectionsManagerGateway } from './ws-connections-manager.gateway';

@Module({
  imports: [UserModule],
  providers: [WsConnectionsManagerGateway],
  exports: [WsConnectionsManagerGateway],
})
export class WebSocketModule {}
