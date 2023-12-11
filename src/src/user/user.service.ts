import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserCreateDto, UserUpdateDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: UserCreateDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.users.create({
      data: {
        login: dto.login,
        password: hash,
        email: dto.email,
        phone: dto.phone,
        avatar: dto.avatar,
        system_role: dto.system_role,
      },
    });
    return user;
  }

  async getSingleUser(userId: number) {
    const user = await this.findUser(userId);
    const userProjects = await this.prisma.members.findMany({
      where: {
        user_id: userId,
      },
      select: {
        projects: true,
      },
    });
    user['projects'] = userProjects;
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.users.findMany();
    return users;
  }

  async update(userId: number, dto: UserUpdateDto) {
    try {
      await this.findUser(userId);
      const user = await this.updateUser(userId, dto);
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Some of fields are not unique');
        }
      }
    }
  }

  async delete(userId: number) {
    await this.findUser(userId);

    await this.prisma.users.delete({
      where: {
        id: userId,
      },
    });
    return 'User is successfully deleted';
  }

  private async findUser(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('No such user');

    return user;
  }

  private async updateUser(userId: number, dto: UserUpdateDto) {
    if (dto.password) {
      dto.password = await argon.hash(dto.password);
    }
    const updUser = await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
        updated_at: new Date(),
      },
    });
    return updUser;
  }
}
