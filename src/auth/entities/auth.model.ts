import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "src/users/entities/users.model";

@Table
export class Sessions extends Model{
    @Column({
        unique:true,
        type: DataType.STRING,
    })
    token: string;

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

    @Column({
        allowNull: false,
        defaultValue: true,
        type: DataType.BOOLEAN
    })
    active: boolean;
}