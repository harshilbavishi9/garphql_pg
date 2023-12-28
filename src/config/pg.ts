import { Sequelize } from 'sequelize-typescript';
export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: "GraphqlTS",
    username: "postgres",
    password: "demo123",
    host: "localhost",
    logging: console.log
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize