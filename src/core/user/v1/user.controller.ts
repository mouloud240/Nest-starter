import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SessionAuthGuard } from 'src/core/authentication/guards/session.guard';

@Controller('user')
@UseGuards(SessionAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
}
