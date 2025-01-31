import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Team } from './entities/team.entity';

@ApiTags('teams')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear equipo', 
    description: 'Crea un nuevo equipo con el usuario actual como propietario' 
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Equipo creado exitosamente',
    type: Team
  })
  @ApiResponse({ 
    status: 401, 
    description: 'No autorizado' 
  })
  async create(@Body() createTeamDto: CreateTeamDto, @CurrentUser() user: User) {
    return this.teamsService.create(createTeamDto, user.id);
  }

  @Post(':id/members')
  @ApiOperation({ summary: 'Agregar miembro a equipo' })
  @ApiResponse({ status: 200, description: 'Miembro agregado exitosamente' })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  async addMember(@Param('id') id: string, @Body() addMemberDto: AddMemberDto) {
    return this.teamsService.addMember(id, addMemberDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener equipos', 
    description: 'Obtiene todos los equipos donde el usuario es propietario o miembro' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de equipos obtenida exitosamente',
    type: [Team]
  })
  async findAll(@CurrentUser() user: User) {
    this.teamsService.logUserId(user.id);
    return this.teamsService.findAllForUser(user.id);
  }
}