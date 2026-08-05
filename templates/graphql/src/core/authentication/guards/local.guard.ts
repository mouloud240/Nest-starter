import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Guard for email/password authentication.
 *
 * Supports both HTTP (REST) and GraphQL contexts. For GraphQL, it maps the
 * `loginInput` argument onto `request.body` so Passport's local strategy can
 * validate credentials the same way it does for REST requests.
 */
@Injectable()
export class LocalGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    const request = (ctx.getContext<{ req?: any }>()?.req ||
      context.switchToHttp().getRequest<any>()) as { body?: any };

    // For GraphQL, credentials come from args instead of body.
    // Map them to the request body so passport-local can read them.
    if (ctx.getContext<{ req?: any }>()?.req) {
      const args = ctx.getArgs<{
        loginInput?: { email?: string; password?: string };
      }>();
      if (args.loginInput) {
        request.body = {
          email: args.loginInput.email,
          password: args.loginInput.password,
        };
      }
    }

    return request;
  }
}
