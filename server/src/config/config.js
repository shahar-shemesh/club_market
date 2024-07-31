require('dotenv').config();

module.exports = {
  development: {
    dialect: 'mssql',
    host: process.env.PROD_DB_HOSTNAME,
    port: parseInt(process.env.PROD_DB_PORT || '1433'),
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    models: [__dirname + '/models'],
    dialectOptions: {
      options: {
        // encrypt: true, // אם אתה משתמש בחיבור מאובטח (SSL)
        trustServerCertificate: true // אם אתה סומך על תעודת השרת
      },
    },
  },
  test: {
    dialect: 'mssql',
    host: process.env.PROD_DB_HOSTNAME,
    port: parseInt(process.env.PROD_DB_PORT || '1433'),
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    models: [__dirname + '/models'],
    dialectOptions: {
      options: {
        // encrypt: true,
        trustServerCertificate: true
      },
    },
  },
  production: {
    dialect: 'mssql',
    host: process.env.PROD_DB_HOSTNAME,
    port: parseInt(process.env.PROD_DB_PORT || '1433'),
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    models: [__dirname + '/models'],
    dialectOptions: {
      options: {
        // encrypt: true,
        trustServerCertificate: true // אם אתה סומך על תעודת השרת
      },
    },
  },
}


// module.exports = {
//   "development": {
//     "username": process.env.DB_USER,
//     "password": process.env.DB_PASSWORD,
//     "database": process.env.DB_NAME,
//     "host": "127.0.0.1",
//     "dialect": "mssql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mssql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mssql"
//   }
// }
