import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectCreateDto, ProjectUpdateDto } from './dto';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  create(@Body() dto: ProjectCreateDto) {
    return this.projectService.create(dto);
  }

  @Get(':id')
  getSingleProject(@Param('id', ParseIntPipe) projectId: number) {
    const project = this.projectService.getSingleProject(projectId);
    return project;
  }

  @Get()
  getAllProjects() {
    const projects = this.projectService.getAllProjects();
    return projects;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) projectId: number,
    @Body() dto: ProjectUpdateDto,
  ) {
    return this.projectService.update(projectId, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) projectId: number) {
    return this.projectService.delete(projectId);
  }
}
