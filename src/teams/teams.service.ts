import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { User } from '../users/entities/user.entity';
import { AddMemberDto } from './dto/add-member.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger(TeamsService.name);

  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: MongoRepository<Team>,
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async create(createTeamDto: CreateTeamDto, ownerId: string): Promise<Team> {
    try {
      const owner = await this.userRepository.findOne({ 
        where: { _id: new ObjectId(ownerId) }
      });
      
      if (!owner) {
        throw new NotFoundException('Owner not found');
      }
      const team = this.teamRepository.create({ 
        ...createTeamDto, 
        owner,
        memberIds: [] 
      });
      const savedTeam = await this.teamRepository.save(team);
      this.logger.debug(`Created team: ${JSON.stringify(savedTeam)}`);
      return savedTeam;
    } catch (error) {
      if (error.name === 'BSONError') {
        throw new BadRequestException('Invalid owner ID format');
      }
      throw error;
    }
  }

  async addMember(teamId: string, addMemberDto: AddMemberDto): Promise<Team> {
    try {
      const team = await this.teamRepository.findOne({ 
        where: { _id: new ObjectId(teamId) }
      });
      
      if (!team) {
        throw new NotFoundException('Team not found');
      }
      
      const user = await this.userRepository.findOne({ 
        where: { _id: new ObjectId(addMemberDto.userId) }
      });
      
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!team.memberIds) {
        team.memberIds = [];
      }
      
      if (team.memberIds.includes(user.id)) {
        throw new BadRequestException('User is already a member of this team');
      }
      
      team.memberIds.push(user.id);
      return this.teamRepository.save(team);
    } catch (error) {
      if (error.name === 'BSONError') {
        throw new BadRequestException('Invalid ID format provided');
      }
      throw error;
    }
  }

  async findAllForUser(userId: string): Promise<Team[]> {
    try {
      const userObjectId = new ObjectId(userId);
      this.logger.debug(`Fetching teams for user ID: ${userId}`);
      const teams = await this.teamRepository.find({
        where: {
          $or: [
            { 'owner.id': userId },
            { memberIds: userId }
          ]
        },
        relations: ['owner']
      });

      // Obtener detalles de los miembros
      for (const team of teams) {
        const members = await this.userRepository.findByIds(team.memberIds);
        team['members'] = members;
      }

      this.logger.debug(`Found teams: ${JSON.stringify(teams)}`);
      return teams;
    } catch (error) {
      if (error.name === 'BSONError') {
        throw new BadRequestException('Invalid user ID format');
      }
      throw error;
    }
  }

  logUserId(userId: string) {
    this.logger.debug(`Current user ID: ${userId}`);
  }
}