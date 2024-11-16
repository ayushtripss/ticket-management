import {Table, Model, Column, DataType, ForeignKey, BelongsTo, Index} from 'sequelize-typescript';
import { Trains } from 'src/trains/trains.model';
import { Users } from 'src/users/entities/users.model';

@Table({
    indexes:[{
        fields: ['trainId','userId']
    }] 
})
export class Tickets extends Model{
    @Column({
        primaryKey: true,
        autoIncrement: true,  
        type: DataType.INTEGER,
    })
    id: number;

    @ForeignKey(()=>Users)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    userId: number;

    @BelongsTo(() => Users,{
        as: 'user',
        foreignKey: {
            name: 'userId'
        }
    })
    user: Users
    
    @ForeignKey(() => Trains)
    @Column({
        allowNull: false,
        type: DataType.INTEGER
    })
    trainId: number;
    @BelongsTo(() => Trains,{
        as: 'train',
        foreignKey: {
            name: 'trainId'
        }
    })
    train: Trains

    @Column({
        allowNull: false,
        type: DataType.DATE
    })
    date: Date;
}

//serialization
//middlewares