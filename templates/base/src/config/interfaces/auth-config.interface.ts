import { StrategyOptions as StrategyOptionsGoogle } from 'passport-google-oauth20';

export interface AuthConfig {
  session: {
    secret: string;
    name: string;
    cookie: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: boolean | 'lax' | 'strict' | 'none';
      maxAge: number;
    };
  };
  csrf: {
    secret: string;
    cookieName: string;
    secure: boolean;
  };
  oauth: {
    google: Partial<StrategyOptionsGoogle>;
  };
}
