import {Table, Model, Column, DataType} from 'sequelize-typescript';

@Table
export class Trains extends Model{
    @Column({
        primaryKey: true,
        autoIncrement: true, 
        type: DataType.INTEGER
    })
    id: number;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    name: string;
}