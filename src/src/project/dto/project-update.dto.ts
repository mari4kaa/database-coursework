import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { project_status } from 'node_modules/.prisma/client/index';

export class ProjectUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @IsEnum(project_status)
  status?: project_status;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  logo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;
}
