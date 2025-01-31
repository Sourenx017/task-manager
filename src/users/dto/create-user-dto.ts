import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Correo electrónico del usuario',
    uniqueItems: true
  })
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;

  @ApiProperty({ 
    example: 'mySecurePass123',
    description: 'Contraseña del usuario (mínimo 8 caracteres)',
    minLength: 8
  })
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @ApiProperty({ 
    example: 'member',
    description: 'Rol del usuario',
    enum: ['admin', 'member']
  })
  @IsNotEmpty()
  @IsEnum(['admin', 'member'], { message: 'El rol debe ser admin o member' })
  role: string = 'member';
}