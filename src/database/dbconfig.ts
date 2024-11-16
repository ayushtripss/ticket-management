import { Dialect } from 'sequelize/types';

export const dbConfig  = {
    dialect: 'postgres' as Dialect,
    host:'localhost',
    port: 5433,
    username: 'postgres',
    password: 'password',
    database: 'management',
}