import { Sequelize, DataTypes } from 'sequelize';

export const sqlClient = new Sequelize('postgres', 'postgres', 'mypassword', {
    host: 'localhost',
    dialect: 'postgres'
})
export async function testDb() {
    try {
        await sqlClient.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
sqlClient.sync(); 