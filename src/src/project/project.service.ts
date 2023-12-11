import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectCreateDto, ProjectUpdateDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ProjectCreateDto) {
    const project = await this.prisma.projects.create({
      data: {
        title: dto.title,
        status: dto.status,
        start_date: dto.start_date ? new Date(dto.start_date) : null,
        end_date: dto.end_date ? new Date(dto.end_date) : null,
        logo: dto.logo,
        description: dto.description,
      },
    });
    return project;
  }

  async getSingleProject(projectId: number) {
    const project = await this.findProject(projectId);
    return project;
  }

  async getAllProjects() {
    const projects = await this.prisma.projects.findMany();
    return projects;
  }

  async update(projectId: number, dto: ProjectUpdateDto) {
    try {
      await this.findProject(projectId);
      const updProject = await this.updateProject(projectId, dto);
      return updProject;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Title is not unique');
        }
      }
    }
  }

  async delete(projectId: number) {
    await this.findProject(projectId);

    await this.prisma.projects.delete({
      where: {
        id: projectId,
      },
    });
    return 'Project is successfully deleted';
  }

  private async findProject(projectId: number) {
    const project = await this.prisma.projects.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) throw new NotFoundException('No such project');

    return project;
  }

  private async updateProject(projectId: number, dto: ProjectUpdateDto) {
    const updProject = await this.prisma.projects.update({
      where: {
        id: projectId,
      },
      data: {
        ...dto,
        updated_at: new Date(),
      },
    });
    return updProject;
  }
}
