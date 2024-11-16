import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Users extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  username: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  hash: string;
}

//maintain a schema and use it to return json as we should not return refernece
//text keyword mapping
