import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { project_status } from 'node_modules/.prisma/client/index';
import { IsUnique } from 'src/shared/validation/is-unique';

export class ProjectCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique({ entity: 'projects', field: 'title' })
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsEnum(project_status)
  status?: project_status;

  @IsNotEmpty()
  @IsDateString()
  start_date: string;

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
