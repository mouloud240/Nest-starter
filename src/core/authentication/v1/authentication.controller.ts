import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { registerDto } from './dtos/requests/register.dto';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './dtos/responses/auth-response.dto';
import { LocalGuard } from '../guards/local.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from 'src/core/user/entities/user.entity';
import { SessionAuthGuard } from '../guards/session.guard';
import { GoogleGuard } from '../guards/oauth/google.guard';
import { SessionRequest } from '../types/session-request.type';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @UseGuards(LocalGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'Logs in a user and creates a server-side session.',
  })
  @ApiOkResponse({
    description: 'Returns the authenticated user details.',
    type: () => AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials provided.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request. The request body is invalid or missing required fields.',
  })
  async login(
    @Req() request: SessionRequest,
    @CurrentUser() user: User,
  ) {
    return this.authenticationService.login(request, user);
  }
  @ApiOperation({
    summary: 'Register user',
    description: 'Registers a new user and sends a verification email.',
  })
  @ApiOkResponse({
    description: 'Returns a success message.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request. The request body is invalid or missing required fields.',
  })
  @Post('register')
  async register(@Body() data: registerDto) {
    return this.authenticationService.registerUser(data);
  }

  @Post('logout')
  @UseGuards(SessionAuthGuard)
  @ApiOperation({
    summary: 'Logout user',
    description: 'Destroys the current server-side session.',
  })
  @ApiOkResponse({
    description: 'Returns a success message.',
  })
  async logout(@Req() request: SessionRequest) {
    return this.authenticationService.logout(request);
  }

  @Post('resend-verification')
  @ApiOperation({
    summary: 'Resend verification email',
    description: 'Resends the verification email to the user.',
  })
  @ApiOkResponse({
    description: 'Returns a message indicating that the email has been sent.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async resendVerification(@Body('email') email: string) {
    return this.authenticationService.resendVerificationCode(email);
  }

  @Post('verify-email')
  @ApiOperation({
    summary: 'Verify email',
    description: "Verifies the user's email with the provided code.",
  })
  @ApiOkResponse({
    description:
      'Returns a message indicating that the email has been verified.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid verification code.',
  })
  async verifyEmail(@Body('email') email: string, @Body('code') code: string) {
    return this.authenticationService.verifyEmail(email, code);
  }

  @Post('forgot-password')
  @ApiOperation({
    summary: 'Forgot password',
    description: 'Sends a password reset email to the user.',
  })
  @ApiOkResponse({
    description: 'Returns a message indicating that the email has been sent.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async forgotPassword(@Body('email') email: string) {
    return this.authenticationService.forgotPassword(email);
  }

  @Post('reset-password')
  @ApiOperation({
    summary: 'Reset password',
    description: "Resets the user's password with the provided token.",
  })
  @ApiOkResponse({
    description:
      'Returns a message indicating that the password has been reset.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid reset token.',
  })
  async resetPassword(
    @Body('token') token: string,
    @Body('password') password: string,
  ) {
    return this.authenticationService.resetPassword(token, password);
  }

  @ApiOperation({
    summary: 'Google OAuth2 login',
    description: 'Initiates the Google OAuth2 login flow.',
  })
  @UseGuards(GoogleGuard)
  @Get('oauth/google')
  googleAuth() {
    return;
  }

  @UseGuards(GoogleGuard)
  @Get('oauth/google/callback')
  async googleAuthRedirect(
    @Req() request: SessionRequest,
    @CurrentUser() user: User,
  ) {
    return this.authenticationService.login(request, user);
  }
}
