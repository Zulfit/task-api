import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async findOne(id: number) {
    const foundTask = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!foundTask) throw new NotFoundException(`Task with id ${id} not found`);
    return foundTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
    if (!updatedTask) throw new NotFoundException(`Task with id ${id} not found`);
    return updatedTask;
  }

  async remove(id: number) {
    const deletedTask = await this.prisma.task.delete({
      where: { id },
    });
    if (!deletedTask) throw new NotFoundException(`Task with id ${id} not found`);
    return deletedTask;
  }
}
