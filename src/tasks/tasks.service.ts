import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../users/entities/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: MongoRepository<Task>,
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const task = this.taskRepository.create({
      ...createTaskDto,
      createdBy: user,
    });
    return this.taskRepository.save(task);
  }

  async findAllForUser(userId: string): Promise<Task[]> {
    return this.taskRepository.find({ where: { createdBy: { id: userId } } });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }
}