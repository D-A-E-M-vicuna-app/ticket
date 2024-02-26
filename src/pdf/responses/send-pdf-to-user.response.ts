import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SendPdfToUserResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}