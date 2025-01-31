import { Entity, ObjectIdColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Team {
  @ObjectIdColumn()
  @ApiProperty({ example: '507f1f77bcf86cd799439013', description: 'Team ID' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Equipo de Desarrollo' })
  name: string;

  @ManyToOne(() => User)
  @ApiProperty({ type: () => User })
  owner: User;

  @Column()
  @ApiProperty({ type: () => [String] })
  memberIds: string[] = [];

  @Column(() => Task)
  tasks: Task[];
}