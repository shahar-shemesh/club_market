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
            // encrypt: true, // אם אתה משתמש בחיבור מאובטח (SSL)
            trustServerCertificate: true // אם אתה סומך על תעודת השרת
        },
    },
});

export default sequelize;