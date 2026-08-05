import { Request } from 'express';
import 'express-session';
import { User } from 'src/core/user/entities/user.entity';

export interface SessionRequest extends Request {
  user?: User;
}
