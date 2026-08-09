import { ApiProperty } from '@nestjs/swagger';

export class CsrfTokenDto {
  @ApiProperty({
    description: 'The CSRF token to send in the x-csrf-token header',
  })
  csrfToken: string;

  constructor(csrfToken: string) {
    this.csrfToken = csrfToken;
  }
}
