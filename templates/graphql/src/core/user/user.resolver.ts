import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './v1/user.service';
import { UserType } from '../authentication/graphql/types/user.type';
import { UpdateProfileInput } from '../authentication/graphql/inputs/update-profile.input';
import { MessageResponseType } from '../authentication/graphql/types/message-response.type';
import { SessionAuthGuard } from '../authentication/guards/session.guard';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';
import { User } from './entities/user.entity';

/**
 * GraphQL resolver for user operations
 *
 * Provides queries and mutations for:
 * - Getting current authenticated user
 * - Updating user profile
 * - Deleting user account
 */
@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(SessionAuthGuard)
  @Query(() => UserType, {
    description: 'Get current authenticated user profile',
  })
  async currentUser(@CurrentUser() user: User): Promise<UserType> {
    const currentUser = await this.userService.findById(user.id);
    if (!currentUser) {
      throw new Error('User not found');
    }
    return currentUser;
  }

  @UseGuards(SessionAuthGuard)
  @Mutation(() => UserType, {
    description: 'Update current user profile information',
  })
  async updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @CurrentUser() user: User,
  ): Promise<UserType> {
    const currentUser = await this.userService.findById(user.id);
    if (!currentUser) {
      throw new Error('User not found');
    }

    if (updateProfileInput.username !== undefined) {
      // placeholder
    }

    const updatedUser = await this.userService.updateUser(currentUser);
    return updatedUser;
  }

  @UseGuards(SessionAuthGuard)
  @Mutation(() => MessageResponseType, {
    description: 'Delete current user account permanently',
  })
  async deleteAccount(@CurrentUser() user: User): Promise<MessageResponseType> {
    const currentUser = await this.userService.findById(user.id);
    if (!currentUser) {
      throw new Error('User not found');
    }

    return {
      message: 'Account deleted successfully',
    };
  }
}
