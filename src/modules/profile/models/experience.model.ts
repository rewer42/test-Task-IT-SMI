import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Achievement } from './achivment.model.js';

@ObjectType()
export class Experience {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  company: string;

  @Field(() => String)
  position: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field(() => [Achievement])
  achievements: Achievement[];
}
