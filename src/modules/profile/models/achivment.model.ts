import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Achievement {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  description: string;
}
