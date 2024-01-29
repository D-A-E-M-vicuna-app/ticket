import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
 
  @Field()
  subject: string;

  @Field()
  description: string;


  @Field()
  userId: number;
}
