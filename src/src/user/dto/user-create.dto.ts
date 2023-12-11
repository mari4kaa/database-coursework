import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { user_system_role } from 'node_modules/.prisma/client/index';
import { IsUnique } from 'src/shared/validation/is-unique';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique({ entity: 'users', field: 'login' })
  @MaxLength(30)
  login: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  password: string;

  @IsOptional()
  @IsEmail()
  @IsUnique({ entity: 'users', field: 'email' })
  @MaxLength(40)
  email?: string;

  @IsOptional()
  @IsString()
  @IsUnique({ entity: 'users', field: 'phone' })
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
