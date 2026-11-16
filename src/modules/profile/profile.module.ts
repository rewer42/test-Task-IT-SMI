import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';
import { ProfileResolver } from './profile.resolver.js';
import { ProfileService } from './profile.service.js';
import { ExperienceResolver } from './experience.resolver.js';
import { AchievementLoader } from './achievment.loader.js';

@Module({
  imports: [PrismaModule],
  providers: [
    ProfileResolver,
    ProfileService,
    ExperienceResolver,
    AchievementLoader,
  ],
  exports: [ProfileService, ProfileResolver],
})
export class ProfileModule {}
