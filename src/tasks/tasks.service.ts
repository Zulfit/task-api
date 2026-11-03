import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: { ...createTaskDto, userId },
    });
  }

  findAll(userId: number) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: number) {
    const foundTask = await this.prisma.task.findFirst({
      where: { id, userId },
    });
    if (!foundTask) throw new NotFoundException(`Task with id ${id} not found`);
    return foundTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.task.update({ where: { id, userId }, data: updateTaskDto });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.task.delete({ where: { id, userId } });
  }
}
