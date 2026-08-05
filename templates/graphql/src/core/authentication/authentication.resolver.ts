import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthenticationService } from './v1/authentication.service';
import { AuthResponseType } from './graphql/types/auth-response.type';
import { MessageResponseType } from './graphql/types/message-response.type';
import { LoginInput } from './graphql/inputs/login.input';
import { RegisterInput } from './graphql/inputs/register.input';
import { VerifyEmailInput } from './graphql/inputs/verify-email.input';
import { ResetPasswordInput } from './graphql/inputs/reset-password.input';
import { SessionAuthGuard } from './guards/session.guard';
import { SessionRequest } from './types/session-request.type';

/**
 * GraphQL resolver for authentication operations
 *
 * Provides mutations for:
 * - User login
 * - User registration
 * - Logout
 * - Email verification
 * - Password reset flow
 *
 * OAuth operations remain in the REST controller
 */
@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => AuthResponseType, {
    description: 'Login user and create a server-side session',
  })
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: { req: SessionRequest },
  ): Promise<AuthResponseType> {
    // passport-local reads credentials from the HTTP body, which is not
    // populated for GraphQL requests, so validate directly instead
    const user = await this.authenticationService.validateUser(
      loginInput.email,
      loginInput.password,
    );
    return this.authenticationService.login(ctx.req, user);
  }

  @Mutation(() => MessageResponseType, {
    description: 'Register a new user and send verification email',
  })
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<MessageResponseType> {
    return this.authenticationService.registerUser(registerInput);
  }

  @UseGuards(SessionAuthGuard)
  @Mutation(() => MessageResponseType, {
    description: 'Logout user and destroy server-side session',
  })
  async logout(
    @Context() ctx: { req: SessionRequest },
  ): Promise<MessageResponseType> {
    return this.authenticationService.logout(ctx.req);
  }

  @Mutation(() => MessageResponseType, {
    description: 'Resend verification email to user',
  })
  async resendVerification(
    @Args('email') email: string,
  ): Promise<MessageResponseType> {
    return this.authenticationService.resendVerificationCode(email);
  }

  @Mutation(() => MessageResponseType, {
    description: 'Verify user email with the provided code',
  })
  async verifyEmail(
    @Args('verifyEmailInput') verifyEmailInput: VerifyEmailInput,
  ): Promise<MessageResponseType> {
    return this.authenticationService.verifyEmail(
      verifyEmailInput.email,
      verifyEmailInput.code,
    );
  }

  @Mutation(() => MessageResponseType, {
    description: 'Send password reset email to user',
  })
  async forgotPassword(
    @Args('email') email: string,
  ): Promise<MessageResponseType> {
    return this.authenticationService.forgotPassword(email);
  }

  @Mutation(() => MessageResponseType, {
    description: 'Reset user password with the provided token',
  })
  async resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
  ): Promise<MessageResponseType> {
    return this.authenticationService.resetPassword(
      resetPasswordInput.token,
      resetPasswordInput.password,
    );
  }
}
