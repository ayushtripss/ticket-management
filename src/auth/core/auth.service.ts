import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { SessionSchema } from "../schema/session.schema";
import { plainToInstance } from "class-transformer";
import { Sessions } from "../entities/auth.model";

@Injectable()
export class AuthServices {
    constructor (private readonly AuthRepository: AuthRepository){}

    async createSession(userId: number):Promise<SessionSchema|null>{
        try{
            const session = await this.AuthRepository.createSession(userId);
            const sessionDto =  this.convertSessionToDto(session);
            return sessionDto;
        }
        catch(error){
            throw new Error(`Error in creating session`);
        }  
    }

    async deleteSession(userId:number):Promise<Boolean|null>{
        try{
            const deleted = await this.AuthRepository.deleteSession(userId);
            if(deleted)
                return deleted;
        }catch(error){
            throw new Error(`Error in deleting session`)
        }
    }

    private convertSessionToDto(session: Sessions): SessionSchema {
        const dto: SessionSchema = plainToInstance(SessionSchema, session.toJSON());
        return dto;
      }
    
}