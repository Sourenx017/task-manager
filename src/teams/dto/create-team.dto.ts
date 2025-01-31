import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Equipo de Desarrollo' })
  @IsString()
  @IsNotEmpty()
  name: string;
}