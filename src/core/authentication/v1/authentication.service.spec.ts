import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bullmq';
import { AuthenticationService } from './authentication.service';
import { UserService } from 'src/core/user/v1/user.service';
import { RedisService } from 'nestjs-redis-client';
import { QUEUE_NAME } from 'src/common/constants/queues';
import authConfig from 'src/config/auth.config';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: UserService, useValue: {} },
        {
          provide: authConfig.KEY,
          useValue: {
            session: {
              secret: 'test-secret',
              name: 'sid',
              cookie: {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 86400000,
              },
            },
            oauth: { google: {} },
          },
        },
        { provide: RedisService, useValue: { get: jest.fn(), set: jest.fn() } },
        {
          provide: getQueueToken(QUEUE_NAME.MAIL),
          useValue: { add: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
