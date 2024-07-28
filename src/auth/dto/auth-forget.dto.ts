import { IsEmail } from 'class-validator';

export class AuthforgetDTO {
  @IsEmail()
  email: string;
}
