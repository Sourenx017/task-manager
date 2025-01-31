import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { User } from '../users/entities/user.entity';
import { AddMemberDto } from './dto/add-member.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: MongoRepository<Team>,
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async create(createTeamDto: CreateTeamDto, ownerId: string): Promise<Team> {
    const owner = await this.userRepository.findOneBy({ id: ownerId });
    if (!owner) {
      throw new Error('Owner not found');
    }
    const team = this.teamRepository.create({ ...createTeamDto, owner });
    return this.teamRepository.save(team);
  }

  async addMember(teamId: string, addMemberDto: AddMemberDto): Promise<Team> {
    const team = await this.teamRepository.findOneBy({ id: teamId });
    if (!team) {
      throw new Error('Team not found');
    }
    const user = await this.userRepository.findOneBy({ id: addMemberDto.userId });
    if (!user) {
      throw new Error('User not found');
    }
    team.members = [...(team.members || []), user];
    return this.teamRepository.save(team);
  }

  async findAllForUser(userId: string): Promise<Team[]> {
    return this.teamRepository.find({
      where: {
        $or: [{ owner: { id: userId } }, { members: { $elemMatch: { id: userId } } }],
      },
    });
  }
}