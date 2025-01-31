import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ 
    example: 'Equipo Frontend',
    description: 'Nombre del equipo a crear',
    minLength: 3
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del equipo es requerido' })
  name: string;
}