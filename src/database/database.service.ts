import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript"
import { dbConfig } from "./dbconfig"
import { Trains } from "src/trains/trains.model"
import { Tickets } from "src/tickets/tickets.model";
import { Users } from "src/users/entities/users.model"
import { Sessions } from "src/auth/entities/auth.model";


@Injectable()
export class DatabaseService {
    private instance: Sequelize;

    async getSequelizeInstance() {
        this.instance = new Sequelize(dbConfig)
        this.instance.addModels([Users,Trains,Tickets,Sessions])
        await this.instance.sync()
    }

    getModels(){
        return this.instance.models;
    }
}