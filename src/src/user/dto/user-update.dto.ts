import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { user_system_role } from 'node_modules/.prisma/client/index';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  login?: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  password?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(40)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  avatar?: string;

  @IsOptional()
  @IsEnum(user_system_role)
  system_role?: user_system_role;
}
