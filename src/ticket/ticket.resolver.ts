import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { DeleteTicketResponse } from './responses/delete-ticket.response';
import { ChangeStatusToInProgressResponse } from './responses/change-status-to-in-progress.response';
import { ChangeStatusToClosedResponse } from './responses/change-status-to-closed.response';
import { ArchiveTicketResponse } from './responses/archive-ticket.response';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) { }

  @Mutation(() => Ticket)
  createTicket(
    @Args('CreateTicketInput') createTicketInput: CreateTicketInput,
  ): Promise<Ticket> {
    console.log('entrando en create de ticket resolver');
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
  updateTicket(
    @Args('UpdateTicketInput') updateTicketInput: UpdateTicketInput,): Promise<Ticket> {
    return this.ticketService.updateTicket(updateTicketInput);
  }

  @Mutation(() => DeleteTicketResponse, { name: 'deleteTicket' })
  deleteTicket(
    @Args('id', { type: () => Int }) id: number,): Promise<DeleteTicketResponse> {
    return this.ticketService.deleteTicket(id);
  }

  @Query(() => [Ticket], { name: 'getTicketsByUserId' })
  getTicketsByUserId(
    @Args('userId', { type: () => Int }) userId: number,): Promise<Ticket[]> {
    return this.ticketService.getTicketsByUserId(userId);
  }

  @Mutation(() => ChangeStatusToInProgressResponse, {
    name: 'changeStatusToInProgress',
  })
  changeStatusToInProgress(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('assignedToId', { type: () => Int }) assignedToId: number,): Promise<ChangeStatusToInProgressResponse> {
    return this.ticketService.changeStatusToInProgress(id, userId, assignedToId);
  }

  @Mutation (() => ChangeStatusToClosedResponse, {
    name: 'changeStatusToClosed',
  })
  changeStatusToClosed(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('assignedToId', { type: () => Int }) assignedToId: number,
  ): Promise<ChangeStatusToClosedResponse> {
    return this.ticketService.changeStatusToClosed(id, userId, assignedToId);
  }

  @Mutation ( () => ArchiveTicketResponse, {name: 'archiveTicket'})
  archiveTicket( @Args( 'ticketId', {type:() => Int}) ticketId: number): Promise<ArchiveTicketResponse> {
    return this.ticketService.archiveTicket(ticketId);
  }

  @Query(() => [Ticket], { name: 'getTicketsArchivedByUserId' })
  getTicketsArchivedByUserId(
    @Args('userId', { type: () => Int }) userId: number,): Promise<Ticket[]> {
    return this.ticketService.getTicketsArchivedByUserId(userId);
  }
}
