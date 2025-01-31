import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';
import { Roles } from '../shared/decorators/roles.decorator';

@ApiTags('users')
@ApiBearerAuth('JWT')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ 
    summary: 'Crear usuario', 
    description: 'Crea un nuevo usuario en el sistema' 
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario creado exitosamente',
    type: User
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de usuario inválidos' 
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ 
    summary: 'Obtener usuarios', 
    description: 'Obtiene la lista de todos los usuarios registrados' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de usuarios obtenida exitosamente',
    type: [User]
  })
  @ApiResponse({ 
    status: 401, 
    description: 'No autorizado - Token JWT inválido o no proporcionado' 
  })
  findAll() {
    return this.usersService.findAll();
  }
}