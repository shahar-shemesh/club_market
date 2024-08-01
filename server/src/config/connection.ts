import { Sequelize } from 'sequelize-typescript';
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'mssql',
    host: process.env.PROD_DB_HOSTNAME,
    port: parseInt(process.env.PROD_DB_PORT || '1433'),
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    models: [__dirname + '/../models'],
    dialectOptions: {
        options: {
            trustServerCertificate: true
        },
    },
});

export default sequelize;