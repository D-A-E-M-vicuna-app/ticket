import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ChangeStatusToClosedResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}