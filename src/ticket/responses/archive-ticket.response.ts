import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ArchiveTicketResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}