import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/core/user/entities/user.entity';
import { UserResponseDto } from './user-response.dto';

export class AuthResponseDto {
  @ApiProperty({
    description: 'The user object containing user details',
    type: () => UserResponseDto,
  })
  user: UserResponseDto;

  constructor(user: User) {
    this.user = new UserResponseDto(user);
  }
}
