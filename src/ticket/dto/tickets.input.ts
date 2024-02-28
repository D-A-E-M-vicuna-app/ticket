import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, IsNumber, IsPositive, IsOptional, Min, IsIn } from 'class-validator';

export enum  TicketStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED",
}

@InputType()
export class TicketsInput {
 
    @Field(() => Int)
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    @Field(() => Int)
    offset: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsIn([TicketStatus.OPEN, TicketStatus.IN_PROGRESS, TicketStatus.CLOSED])
    status?: string;
   
    @Field({ nullable: true })
    @IsOptional()
    archived?: boolean;

}
