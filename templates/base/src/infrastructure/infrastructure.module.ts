import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UploadModule } from './upload/upload.module';
import { QueueModule } from './queue/queue.module';
import { RedisModule } from 'nestjs-redis-client';
import redisConfig from 'src/config/redis.config';

@Module({
  imports: [
    DbModule,
    UploadModule,
    QueueModule,
    RedisModule.registerAsync(redisConfig.asProvider()),
  ],
  exports: [RedisModule, QueueModule, UploadModule, DbModule],
})
export class InfrastructureModule {}
