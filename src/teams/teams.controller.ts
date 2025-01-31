import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto, @CurrentUser() user: User) {
    return this.teamsService.create(createTeamDto, user.id);
  }

  @Post(':id/members')
  async addMember(@Param('id') id: string, @Body() addMemberDto: AddMemberDto) {
    return this.teamsService.addMember(id, addMemberDto);
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.teamsService.findAllForUser(user.id);
  }
}