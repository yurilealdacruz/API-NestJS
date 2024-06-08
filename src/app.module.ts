import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot(),
    forwardRef(() => userModule), 
    forwardRef(() => AuthModule),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'tessie.wunsch83@ethereal.email',
          pass: 'tYQE4uvHCG4nubvhwU'
    },
  },
    defaults: {
      from: '"Yakiro" <tessie.wunsch83@ethereal.email>',
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new PugAdapter(),
      options: {
        strict: true,
      }
    }
  })
  
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
  ],
})
export class AppModule {}
