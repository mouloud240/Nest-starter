import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import appConfig from 'src/config/app.config';
import redisConfig from 'src/config/redis.config';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY, redisConfig.KEY],
      useFactory: (
        configService: ConfigType<typeof appConfig>,
        redisConf: ConfigType<typeof redisConfig>,
      ) => ({
        storage: new ThrottlerStorageRedisService({
          host: redisConf.host,
          port: redisConf.port,
          db: 2,
        }),
        throttlers: [
          {
            name: 'global',
            limit: configService.throttler.limit,
            ttl: configService.throttler.ttl,
            blockDuration: configService.throttler.blockDuration,
          },
        ],
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [ThrottlerModule],
})
export class RateLimitingModule {}
