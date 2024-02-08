import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { DeleteTicketResponse } from './responses/delete-ticket.response';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Mutation(() => Ticket)
  createTicket(@Args('CreateTicketInput') createTicketInput: CreateTicketInput):Promise<Ticket> {
    console.log("entrando en create de ticket resolver");
    return this.ticketService.create(createTicketInput);
  }

  @Query(() => [Ticket], { name: 'tickets' })
  findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Ticket> {
    return this.ticketService.findOne(id);
  }

  @Mutation(() => Ticket)
  updateTicket(@Args('UpdateTicketInput') updateTicketInput: UpdateTicketInput): Promise<Ticket> {
    return this.ticketService.updateTicket(updateTicketInput);
  }

  @Mutation(() => DeleteTicketResponse, { name: 'deleteTicket' })
  deleteTicket(@Args('id', { type: () => Int }) id: number): Promise<DeleteTicketResponse>{
    return this.ticketService.deleteTicket(id);
  }

  @Query(() => [Ticket], { name: 'getTicketsByUserId' })
  getTicketsByUserId(@Args('userId', { type: () => Int }) userId: number):Promise<Ticket[]> {
    return this.ticketService.getTicketsByUserId(userId);
  }
}
