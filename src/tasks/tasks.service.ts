import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { Task } from './entities/task.entity.js';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  create(createTaskDto: CreateTaskDto) {
    const newTask: Task = {
      id: this.nextId++,
      ...createTaskDto,
      done: createTaskDto.done ??
       false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);
    const updatedTask: Task = {
      ...task,
      ...updateTaskDto,
    };
    this.tasks = this.tasks.map(t => t.id === id ? updatedTask : t);
    return updatedTask;
  }

  remove(id: number) {
    const task = this.findOne(id);
    this.tasks = this.tasks.filter(t => t.id !== id);
    return task;
  }
}
