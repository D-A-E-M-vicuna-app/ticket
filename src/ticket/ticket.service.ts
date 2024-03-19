import { Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, MoreThanOrEqual } from 'typeorm';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { request, gql } from 'graphql-request';
import { DeleteTicketResponse } from './responses/delete-ticket.response';
import { ChangeStatusToInProgressResponse } from './responses/change-status-to-in-progress.response';
import { TicketStatus } from './entities/ticket.entity';
import { ArchiveTicketResponse } from './responses/archive-ticket.response';
import { TicketsInput } from './dto/tickets.input';
/*interface TicketsInput {
  limit: number;
  offset: number;
  status?: string;
  archived?: boolean;
}*/

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}
  async create(createTicketInput: CreateTicketInput): Promise<Ticket> {
    console.log('entrando en create de ticket service');
    const userId = createTicketInput.userId;
    /*
    const client = new ApolloClient({
      uri: 'http://localhost:3000/graphql',
      cache: new InMemoryCache()
    });*/
    interface UserResponse {
      user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        accessToken: string;
      };
    }

    const GET_USER_BY_ID = gql`
      query GetUserById($id: Int!) {
        user(id: $id) {
          id
          firstName
          lastName
          email
          accessToken
        }
      }
    `;
    const endpoint = `https://${process.env.NEXT_PUBLIC_USER_DOMAIN}` || 'http://localhost:3000/graphql';

    /*const { data } = await client.query({
      query: GET_USER_BY_ID,
      variables: { id: userId }
    })*/

    const data = await request<UserResponse>(endpoint, GET_USER_BY_ID, {
      id: userId,
    });

    console.log('data de usuario: ', data.user);
    if (!data.user) {
      throw new Error('User not found');
    }
    const newTicket = this.ticketRepository.create(createTicketInput);
    return this.ticketRepository.save(newTicket);
  }

 
  

  async findAll({ limit, offset, status, archived, date }: TicketsInput): Promise<Ticket[]> {
    const findOptions: FindManyOptions<Ticket> = {
      skip: offset,
      take: limit,
    };
    console.log("-------------------------------")
    console.log("valor de status: ", status)
    console.log("valor de archived: ", archived)

    if (status && status !== "") {
      findOptions.where = { status: status as TicketStatus};
    }

    if (archived !== null) { // Si archived es undefined, este bloque no se ejecutará
      findOptions.where = { ...findOptions.where, archived };
    }

    if (date) {
      const dateObj = new Date(date);
      findOptions.where = { 
        ...findOptions.where, 
        createdAt: MoreThanOrEqual(dateObj)
      };
    }

    const tickets = await this.ticketRepository.find(findOptions);

    // const tickets = await this.ticketRepository.find({skip: offset, take: limit,});
    if (tickets.length === 0) {
      throw new Error('No more tickets');
    }
    return tickets;
  }

  async findAllTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  findOne(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({ where: { id } });
  }

  async updateTicket(updateTicketInput: UpdateTicketInput): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id: updateTicketInput.id },
    });
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    if (updateTicketInput.subject) {
      ticket.subject = updateTicketInput.subject;
    }
    if (updateTicketInput.description) {
      ticket.description = updateTicketInput.description;
    }
    return await this.ticketRepository.save(ticket);
  }

  async deleteTicket(id: number): Promise<DeleteTicketResponse> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) {
      return { success: false, message: 'Ticket not found' };
    }
    this.ticketRepository.remove(ticket);
    return { success: true, message: 'Ticket deleted successfully' };
  }

  async getTicketsByUserId(userId: number): Promise<Ticket[]> {
    console.log('userId en service de tickets: ', userId);
    try {
      const tickets = await this.ticketRepository.find({
        where: { userId, archived: false },
      }); //devuelve los tickets no archivados
      if (!tickets.length) {
        throw new Error('No tickets found for this user ID');
      }
      return tickets;
    } catch (error) {
      throw new Error(`Error retrieving tickets: ${error.message}`);
    }
  }

  async changeStatusToInProgress(
    id: number,
    userId: number,
    assignedToId: number,
  ): Promise<ChangeStatusToInProgressResponse> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) {
      return { success: false, message: 'Ticket not found' };
    }
    if (ticket.userId !== userId) {
      return {
        success: false,
        message: 'You are not authorized to change the status of this ticket',
      };
    }
    if (ticket.status === TicketStatus.OPEN) {
      ticket.status = TicketStatus.IN_PROGRESS; //cambia el estado del ticket a IN_PROGRESS
      ticket.assignedToId = assignedToId; //asigna el tickwet al admin que lo acepta
      await this.ticketRepository.save(ticket);
      return { success: true, message: 'Ticket status changed to IN_PROGRESS' };
    }
    return { success: false, message: 'Ticket status could not be changed' };
  }

  async changeStatusToClosed(
    id: number,
    userId: number,
    assignedToId: number,
  ): Promise<ChangeStatusToInProgressResponse> {
    console.log(id, userId, assignedToId);
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) {
      return { success: false, message: 'Ticket not found' };
    }
    if (ticket.userId !== userId) {
      return {
        success: false,
        message: 'You are not authorized to change the status of this ticket',
      };
    }
    if (ticket.status === TicketStatus.IN_PROGRESS) {
      ticket.status = TicketStatus.CLOSED;
      ticket.assignedToId = assignedToId;
      ticket.closedAt = new Date();
      await this.ticketRepository.save(ticket);
      return { success: true, message: 'Ticket status changed to CLOSED' };
    }
    return { success: false, message: 'Ticket status could not be changed' };
  }

  async archiveTicket(ticketId: number): Promise<ArchiveTicketResponse> {
    try {
      const ticket = await this.ticketRepository.findOne({
        where: { id: ticketId },
      });
      if (!ticket) {
        return { success: false, message: 'Ticket not found' };
      }
      ticket.archived = true;
      await this.ticketRepository.save(ticket);
      return { success: true, message: 'Ticket archived successfully' };
    } catch (error) {
      return {
        success: false,
        message: `Error archiving ticket: ${error.message}`,
      };
    }
  }

  async getTicketsArchivedByUserId(userId: number): Promise<Ticket[]> {
    console.log('userId en service de tickets: ', userId);
    try {
      const tickets = await this.ticketRepository.find({
        where: { userId, archived: true },
      }); //devuelve los tickets  archivados
      if (!tickets.length) {
        throw new Error('No tickets found for this user ID');
      }
      return tickets;
    } catch (error) {
      throw new Error(`Error retrieving tickets: ${error.message}`);
    }
  }
}
