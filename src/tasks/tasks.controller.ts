import { Controller, Post, Body, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear tarea', 
    description: 'Crea una nueva tarea asociada a un equipo' 
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Tarea creada exitosamente',
    type: Task
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de tarea inválidos' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Equipo no encontrado' 
  })
  async create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: User) {
    return this.tasksService.create(createTaskDto, user.id);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener tareas', 
    description: 'Obtiene todas las tareas asociadas al usuario (creadas por él o asignadas a sus equipos)' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de tareas obtenida exitosamente',
    type: [Task]
  })
  async findAll(@CurrentUser() user: User) {
    return this.tasksService.findAllForUser(user.id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar tarea', 
    description: 'Actualiza el estado u otros campos de una tarea específica' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID de la tarea',
    type: 'string'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Tarea actualizada exitosamente',
    type: Task
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Tarea no encontrada' 
  })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }
}