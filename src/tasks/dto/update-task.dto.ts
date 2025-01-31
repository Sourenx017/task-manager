import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ 
    enum: ['pending', 'in-progress', 'completed'],
    description: 'Estado actual de la tarea',
    example: 'in-progress',
    required: false
  })
  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'completed'], {
    message: 'El estado debe ser: pending, in-progress o completed'
  })
  status?: string;
}