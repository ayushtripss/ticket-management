import { Inject, Injectable } from "@nestjs/common";
import { v4 as UUIDV4 } from "uuid"
import { DatabaseService } from "src/database/database.service";
import { Sessions } from "../entities/auth.model";


@Injectable()
export class AuthRepository {
    private models;
    constructor(@Inject('SEQUELIZE') private database:DatabaseService){
        this.models = this.database.getModels();
    }

    async createSession(userId:number):Promise<Sessions|null>{
        try{
            const session = await this.models.Sessions.create({
                token: UUIDV4(),
                userId
            })
            if(session)
                return session;
        }catch(error){
            throw new Error(`Error in creating session ${error}`);
        }
    }

    async deleteSession(userId:number):Promise<Boolean|null>{
        try{
            const result = await this.models.Sessions.update(
                { active: false },
                { where: { userId, active: true } }
            );
            if (result[0] > 0) {
                return true;
            }
        }catch(error){
            throw new Error('Error in deleting session')
        }
    }
}