import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ 
    example: 'Implementar autenticación',
    description: 'Título de la tarea a crear',
    minLength: 3
  })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título de la tarea es requerido' })
  title: string;

  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011',
    description: 'ID del equipo al que pertenecerá la tarea',
    pattern: '^[0-9a-fA-F]{24}$'
  })
  @IsString()
  @IsNotEmpty()
  @IsMongoId({ message: 'El ID del equipo debe ser un MongoID válido' })
  teamId: string;
}