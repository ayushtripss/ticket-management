import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    hash: string;
  }