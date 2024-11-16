import { Injectable } from '@nestjs/common';
import { Trains } from './trains.model'; 
import { TrainsRepository } from './trains.repository';
import { CreateTrainDto } from './create-train.dto';
import { TicketsServices } from 'src/tickets/tickets.services';

@Injectable()
export class TrainsService {
    constructor (private readonly userRepository: TrainsRepository ,private readonly ticketService: TicketsServices){}

    getAll():Promise<Trains[]>{
        return this.userRepository.findAll();
    } 
    
    create(train: CreateTrainDto):Promise<Trains>{
        return this.userRepository.createTrain(train);
    } 

    async findAllTickets(id:number){
        const allTickets = this.ticketService.findAllTicketsForTrain(id);
        return allTickets;
    }
}