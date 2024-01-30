import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateTicketInput {
 
  @Length(3, 30)
  @IsString()
  @IsNotEmpty()
  @Field()
  subject: string;

  @IsString() 
  @Field()
  @Length(3, 50)
  description?: string;

  @IsNotEmpty()
  @Field()
  userId: number;//obtenerlo del accessToken
}
