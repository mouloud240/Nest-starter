import { BullModule } from '@nestjs/bullmq';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { QUEUE_NAME } from 'src/common/constants/queues';
import redisConfig from 'src/config/redis.config';
import { UploadModule } from '../upload/upload.module';
import { EmailModule } from 'src/common/modules/email/email.module';
import { loadProcessors } from './processor.loader';

@Global()
@Module({})
export class QueueModule {
  static register(): DynamicModule {
    const processors = loadProcessors();

    return {
      module: QueueModule,
      imports: [
        BullModule.forRootAsync({
          useFactory: (configService: ConfigType<typeof redisConfig>) => {
            const redisHost = configService.host;
            const redisPort = configService.port;
            const redisUrl = `redis://${redisHost}:${redisPort}`;
            return {
              connection: {
                host: redisHost,
                port: redisPort,
                url: redisUrl,
                db: 3,
              },
            };
          },
          inject: [redisConfig.KEY],
        }),
        BullModule.registerQueue(
          ...Object.values(QUEUE_NAME).map((queueName) => ({
            name: queueName,
          })),
        ),
        UploadModule,
        EmailModule,
      ],
      providers: processors,
      exports: [BullModule],
    };
  }
}
