import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { User } from '../users/entities/user.entity';
import { AddMemberDto } from './dto/add-member.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class TeamsService {
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
      return this.teamRepository.save(team);
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
      return this.teamRepository.find({
        where: {
          $or: [
            { 'owner._id': userObjectId },
            { memberIds: userId }
          ]
        },
      });
    } catch (error) {
      if (error.name === 'BSONError') {
        throw new BadRequestException('Invalid user ID format');
      }
      throw error;
    }
  }
}