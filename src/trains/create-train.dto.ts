import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTrainDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}