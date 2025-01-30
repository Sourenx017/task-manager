import { Entity, ObjectIdColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
//import { Task } from '../../tasks/entities/task.entity';
//import { Team } from '../../teams/entities/team.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'User ID' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @Column()
  password: string;  // Se excluirá en los DTOs de respuesta

  @Column({ default: 'member' })
  @ApiProperty({ enum: ['admin', 'member'] })
  role: string;

  //@OneToMany(() => Task, task => task.createdBy)
  //tasks: Task[];

  //@OneToMany(() => Team, team => team.owner)
  //teams: Team[];
}