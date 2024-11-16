import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TrainsService } from './trains.services';
import { CreateTrainDto } from './create-train.dto';
import { Trains } from './trains.model';

@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

    @Post('create')
    createTrain(@Body() train:CreateTrainDto):Promise<Trains>{
      return this.trainsService.create(train);
    }

    @Get('list')
    getAlltrains():Promise<Trains[]>{
      return this.trainsService.getAll();
    }

    @Get('all/:id')
    async getAllTickets(@Param('id',ParseIntPipe) id:number){      
      const allTickets = await this.trainsService.findAllTickets(id);
      return allTickets;
    }
}
