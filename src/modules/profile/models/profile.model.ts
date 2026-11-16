import { ObjectType, Field } from '@nestjs/graphql';
import { ProfileLink } from './profilelink.model.js';
import { Skill } from './skill.model.js';
import { Experience } from './experience.model.js';
import { Project } from './project.model.js';

@ObjectType()
export class Profile {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => [ProfileLink])
  links: ProfileLink[];

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Experience])
  experience: Experience[];

  @Field(() => [Project])
  projects: Project[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
