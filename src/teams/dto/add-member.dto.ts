import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class AddMemberDto {
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011',
    description: 'ID del usuario a agregar al equipo',
    pattern: '^[0-9a-fA-F]{24}$'
  })
  @IsString()
  @IsNotEmpty()
  @IsMongoId({ message: 'El ID del usuario debe ser un MongoID válido' })
  userId: string;
}