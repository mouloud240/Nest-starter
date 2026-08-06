import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserService } from 'src/core/user/v1/user.service';
import { LocalGuard } from '../guards/local.guard';
import { SessionAuthGuard } from '../guards/session.guard';
import { CsrfService } from 'src/common/modules/csrf/csrf.service';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      controllers: [AuthenticationController],
      providers: [
        { provide: AuthenticationService, useValue: {} },
        { provide: UserService, useValue: {} },
        { provide: CsrfService, useValue: { generateToken: jest.fn() } },
        LocalGuard,
        SessionAuthGuard,
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
