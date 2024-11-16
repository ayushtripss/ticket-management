import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Trains } from './trains.model'; 
import { CreateTrainDto } from './create-train.dto'; 

@Injectable()
export class TrainsRepository {
    private models;
    constructor(@Inject('SEQUELIZE') private database:DatabaseService){
        this.models = this.database.getModels();
    }

    async findAll():Promise<Trains[]|null>{
        return this.models.Trains.findAll();
    }

    async createTrain(train: CreateTrainDto):Promise<Trains>{
        const createdTrain = await this.models.Trains.create({
            name: train.name,
        });
        return createdTrain;
    }

}