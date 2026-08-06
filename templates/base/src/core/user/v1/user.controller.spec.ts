import { TestBed } from '@suites/unit';
import type { Mocked } from '@suites/doubles.jest';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: Mocked<UserService>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(UserController).compile();
    controller = unit;
    userService = unitRef.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });
});
