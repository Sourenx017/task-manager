import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../users/entities/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ObjectId } from 'mongodb';
import { Team } from '../teams/entities/team.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: MongoRepository<Task>,
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    @InjectRepository(Team)
    private readonly teamRepository: MongoRepository<Team>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(userId) },
    });
    
    if (!user) {
      throw new Error('User not found');
    }

    const team = await this.teamRepository.findOne({
      where: { _id: new ObjectId(createTaskDto.teamId) }
    });

    if (!team) {
      throw new Error('Team not found');
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      createdBy: user,
      team: team
    });
    const savedTask = await this.taskRepository.save(task);
    this.logger.debug(`Created task: ${JSON.stringify(savedTask)}`);
    return savedTask;
  }

  async findAllForUser(userId: string): Promise<Task[]> {
    const userObjectId = new ObjectId(userId);
    this.logger.debug(`Fetching tasks for user ID: ${userId}`);
    const tasks = await this.taskRepository.find({
      where: {
        $or: [
          { 'createdBy.id': userId },
          { 'team.memberIds': userId }
        ]
      }
    });
    this.logger.debug(`Found tasks: ${JSON.stringify(tasks)}`);
    return tasks;
  }

  async findAllPaginated(userId: string, page: number, limit: number): Promise<Task[]> {
    const skip = (page - 1) * limit;
    return this.taskRepository.find({
      where: { 'createdBy._id': new ObjectId(userId) },
      skip,
      take: limit,
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { _id: new ObjectId(id) }
    });
    
    if (!task) {
      throw new Error('Task not found');
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }
}