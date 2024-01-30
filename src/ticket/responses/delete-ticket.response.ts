import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteTicketResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}