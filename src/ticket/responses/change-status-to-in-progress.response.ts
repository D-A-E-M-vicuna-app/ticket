import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ChangeStatusToInProgressResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}