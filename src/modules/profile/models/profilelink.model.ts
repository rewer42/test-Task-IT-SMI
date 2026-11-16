import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProfileLink {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  platform: string;

  @Field(() => String)
  value: string;
}
