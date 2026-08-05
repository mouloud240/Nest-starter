import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/core/user/entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({
    description: 'The user object containing user details',
    type: () => User,
  })
  user: User;
}
