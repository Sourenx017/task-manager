import { Entity, ObjectIdColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.teams)
  @ApiProperty({ type: () => User })
  owner: User;

  @OneToMany(() => Task, (task) => task.team)
  tasks: Task[];

  @ManyToMany(() => User)
  members: User[];
}