import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

export enum TicketStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

@ObjectType()
@Entity()
export class Ticket {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  subject: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({
    type: "enum",
    enum: TicketStatus,
    default: TicketStatus.OPEN
  })
  status: TicketStatus;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  closedAt: Date;

  @Field()
  @Column()
  userId: number;

  @Field()
  @Column()
  institutionId: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  assignedToId: number;

  @Field()
  @Column({ default: false})
  archived: boolean;  



}
