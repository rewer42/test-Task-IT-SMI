import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.profile.findFirst();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async getSkills(profileId: string) {
    return this.prisma.skill.findMany({
      where: {
        profileId,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async getProfileLink(profileId: string) {
    return this.prisma.profileLink.findMany({
      where: {
        profileId,
      },
    });
  }

  async getExperience(profileId: string) {
    return this.prisma.experience.findMany({
      where: {
        profileId,
      },
    });
  }

  async getProject(profileId: string) {
    return this.prisma.project.findMany({
      where: {
        profileId,
      },
    });
  }

  async getAchievement(experienceId: number) {
    return this.prisma.achievement.findMany({
      where: {
        experienceId,
      },
    });
  }
}
