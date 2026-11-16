import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Experience } from './models/experience.model.js';
import { Achievement } from './models/achivment.model.js';
import { AchievementLoader } from './achievment.loader.js';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly achievementLoader: AchievementLoader) {}

  @ResolveField(() => [Achievement])
  async achievements(@Parent() experience: Experience) {
    return this.achievementLoader.loader.load(experience.id);
  }
}
