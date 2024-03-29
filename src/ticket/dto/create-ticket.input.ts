import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateTicketInput {
 
  @Length(3, 100)
  @IsString()
  @IsNotEmpty()
  @Field()
  subject: string;

  @IsString() 
  @Field()
  @Length(3, 300)
  description?: string;

  @IsNotEmpty()
  @Field()
  userId: number;//obtenerlo del accessToken

  @IsNotEmpty()
  @Field(() => Int, { nullable: true })
  institutionId: number;
  
}
