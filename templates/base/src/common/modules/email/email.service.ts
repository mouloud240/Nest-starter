import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  logger = new Logger(EmailService.name);
  constructor(private readonly mailerService: MailerService) {}

  private get isSmtpConfigured(): boolean {
    const host = process.env.MAIL_HOST;
    return host !== undefined && host !== '' && host !== 'smtp.example.com';
  }

  // ponytail: dev fallback so register->verify->login works without SMTP.
  private shouldSkipSend(): boolean {
    return !this.isSmtpConfigured && process.env.NODE_ENV !== 'test';
  }

  private devFallback(payload: string): void {
    this.logger.log(
      `[DEV MAILER] SMTP not configured, no email sent. Code/token: ${payload}`,
    );
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    if (this.shouldSkipSend()) {
      return this.devFallback(body);
    }
    await this.mailerService.sendMail({
      to: to,
      subject: subject,
      text: body,
    });
    this.logger.log(`Email sent to ${to}`);
  }

  async sendVerificationEmail(to: string, code: string): Promise<void> {
    if (this.shouldSkipSend()) {
      return this.devFallback(code);
    }
    await this.mailerService.sendMail({
      to,
      subject: 'Email Verification',
      template: './verification',
      context: {
        code,
      },
    });
    this.logger.log(`Verification email sent to ${to}`);
  }

  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    if (this.shouldSkipSend()) {
      return this.devFallback(token);
    }
    await this.mailerService.sendMail({
      to,
      subject: 'Password Reset',
      template: './password-reset',
      context: {
        token,
      },
    });
    this.logger.log(`Password reset email sent to ${to}`);
  }
}
