"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
require('dotenv').config();
const sequelize = new sequelize_typescript_1.Sequelize({
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
exports.default = sequelize;
