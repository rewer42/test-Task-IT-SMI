import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Profile } from './models/profile.model.js';
import { ProfileService } from './profile.service.js';
import { Skill } from './models/skill.model.js';
import { ProfileLink } from './models/profilelink.model.js';
import { Experience } from './models/experience.model.js';
import { Project } from './models/project.model.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile)
  async profile() {
    return this.profileService.getProfile();
  }

  @ResolveField(() => [Skill])
  async skills(@Parent() profile: Profile) {
    return this.profileService.getSkills(profile.id);
  }

  @ResolveField(() => [ProfileLink])
  async links(@Parent() profile: Profile) {
    return this.profileService.getProfileLink(profile.id);
  }

  @ResolveField(() => [Experience])
  async experience(@Parent() profile: Profile) {
    return this.profileService.getExperience(profile.id);
  }

  @ResolveField(() => [Project])
  async projects(@Parent() profile: Profile) {
    return this.profileService.getProject(profile.id);
  }
}
