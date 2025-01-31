import { Entity, ObjectIdColumn, Column, ManyToOne, Relation } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity()
export class Task {
  @ObjectIdColumn()
  @ApiProperty({ example: '507f1f77bcf86cd799439012', description: 'Task ID' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Implementar autenticación' })
  title: string;

  @Column({ default: 'pending' })
  @ApiProperty({ enum: ['pending', 'in-progress', 'completed'] })
  status: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @ApiProperty({ type: () => User })
  createdBy: Relation<User>;

  @ManyToOne(() => Team, (team) => team.tasks)
  @ApiProperty({ type: () => Team })
  team: Relation<Team>;
}