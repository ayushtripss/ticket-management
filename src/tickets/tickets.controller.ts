import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TicketsServices } from './tickets.services';
import { CreateTicketDto } from './create-ticket.dto';
import { Tickets } from './tickets.model';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsServices) {}

    @Post()
    async createTickets(@Body() ticket:CreateTicketDto):Promise<Tickets>{
      const newTicket = await this.ticketsService.create(ticket);
      return newTicket;
    }

    @Get(':id')
    async findOne(@Param('id',ParseIntPipe) id:number ):Promise<Tickets>{
      const ticket = await this.ticketsService.getOne(id);
      return ticket;
    }
    
    @Delete(':id')
    async deleteOne(@Param('id',ParseIntPipe) id:number):Promise<Number>{
      const deletedId = await this.ticketsService.deleteOne(id);
      return deletedId;
    } 
}
