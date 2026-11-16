import { Injectable, Scope } from '@nestjs/common';
import { Achievement } from './models/achivment.model.js';
import { PrismaService } from '../prisma/prisma.service.js';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class AchievementLoader {
  constructor(private readonly prisma: PrismaService) {}

  readonly loader = new DataLoader<number, Achievement[]>(
    async (experienceIds) => {
      const achievements = await this.prisma.achievement.findMany({
        where: {
          experienceId: {
            in: [...experienceIds],
          },
        },
        orderBy: {
          sortOrder: 'asc',
        },
      });

      return experienceIds.map((id) =>
        achievements.filter((item) => item.experienceId === id),
      );
    },
  );
}
