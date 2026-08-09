import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({ description: 'Response message' })
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
