import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
    @IsNotEmpty()
    @IsInt()
    userId: number;
  
    @IsNotEmpty()
    @IsInt()
    trainId: number;
  
    @IsNotEmpty()
    date: Date;
  }