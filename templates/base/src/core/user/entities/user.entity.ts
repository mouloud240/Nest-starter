export class User {
  id: string;
  email: string;
  password: string;
  isMailVerified: boolean;
  username?: string;
  oauthProvider?: string;
  oauthId?: string;
}
