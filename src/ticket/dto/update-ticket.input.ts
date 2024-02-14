
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString, IsInt, Length} from 'class-validator';

@InputType()
export class UpdateTicketInput  {
    
  
    @Field(() => Int)
    @IsInt()
    id: number;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    @Length(3, 100)
    subject?: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    @Length(3, 300)
    description?: string;

 
}
