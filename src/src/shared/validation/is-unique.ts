import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';

interface IsUnique {
  entity: 'projects' | 'users';
  field: string;
}

export function IsUnique(
  options: IsUnique,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const prismaService = new PrismaService();

          const whereClause = {
            [options.field]: value,
          };

          const existingEntity = await (
            prismaService[options.entity] as any
          ).findUnique({
            where: whereClause,
          });

          if (existingEntity) {
            return false;
          }

          return true;
        },
        defaultMessage: ({ value }) =>
          `The ${options.field} "${value}" is not unique.`,
      },
    });
  };
}
