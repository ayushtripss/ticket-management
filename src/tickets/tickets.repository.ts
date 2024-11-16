import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Tickets } from './tickets.model';
import { CreateTicketDto } from './create-ticket.dto';

@Injectable()
export class TicketsRepository {
    private models;
    constructor(@Inject('SEQUELIZE') private database:DatabaseService){
        this.models = this.database.getModels();
    }
    
    async findOneById(id:number):Promise<Tickets|null>{
        return await this.models.Tickets.findByPk(id);
    }

    async createTicket(ticket:CreateTicketDto):Promise<Tickets>{
        const createdTicket = await this.models.Tickets.create({
           userId: ticket.userId,
           trainId: ticket.trainId,
           date: ticket.date
        });        
        return createdTicket;
    }

    async deleteTicket(id:number):Promise<Number>{
        return await this.models.Tickets.destroy({
            where: {id}
        })
    }
    
    async findAllTicketsForTrain(id:number):Promise<Tickets[]|null>{
        try{
            const allTicketsForUser = await this.models.Tickets.findAll({
                where: {
                    trainId: id,
                },
            })
            return allTicketsForUser;;
        }catch(error){
            throw new Error('Error in finding tickets')
        }  
    }

    async findAllTicketsForUser(id:number):Promise<Tickets[]|null>{
        try{
            const allTicketsForUser = await this.models.Tickets.findAll({
                where: {
                    userId: id,
                },
            })
            return allTicketsForUser;;
        }catch(error){
            throw new Error('Error in finding tickets')
        }  
    }
}