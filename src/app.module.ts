import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [userModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
