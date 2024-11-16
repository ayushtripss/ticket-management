import { Inject, Injectable } from '@nestjs/common';
import { Tickets } from './tickets.model';  
import { TicketsRepository } from './tickets.repository'; 
import { CreateTicketDto } from './create-ticket.dto';
import { SearchService } from 'src/search/search.service';
import { EventEmitterService } from 'src/event/eventEmitter.service';

@Injectable()
export class TicketsServices {
    constructor (private readonly ticketRepository: TicketsRepository,
        @Inject('OPENSEARCH') private searchServices: SearchService,
        private eventEmitterService:EventEmitterService
        ){}

    async getOne(id:number):Promise<Tickets>{
        return this.ticketRepository.findOneById(id);
    } 
    
    async create(ticket:CreateTicketDto):Promise<Tickets>{
        try{            
            const newTicket = await this.ticketRepository.createTicket(ticket);
            console.log("1");
            this.eventEmitterService.emitEvent('ticket.created',newTicket);
            console.log("4");
            return newTicket;
        }catch(error){
            throw new Error(`Error in creating ticket`)
        }   
    } 

    async deleteOne(id:number):Promise<Number>{
        return this.ticketRepository.deleteTicket(id);
    }

    async findAllTicketsForTrain(id:number):Promise<Tickets[]|null>{
        try{
            const allTickets = await this.ticketRepository.findAllTicketsForTrain(id);
            const tickets = await this.searchServices.getTickets(id);
            return allTickets;  
        }catch(error){
            throw new Error("Error in finding ticket")
        } 
    }
    
    async findAllTicketsForUser(id:number):Promise<Tickets[]|null>{
        try{
            const allTickets = await this.ticketRepository.findAllTicketsForUser(id);
            return allTickets;  
        }catch(error){
            throw new Error("Error in finding ticket")
        } 
    }

    async toOpenSearch(ticket){
        try{
            await this.searchServices.putDatainIndex(ticket);
        }catch(error){
            throw new Error(error.message)
        }
    }
}