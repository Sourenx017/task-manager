import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { Team } from '../teams/entities/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User, Team])
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
