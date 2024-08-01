import express, { Request, Response, NextFunction } from 'express';
import strongErrorHandler from 'strong-error-handler';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/connection';
import Category from './models/Category';
import User from './models/User';
import { categories } from './seeders/categories';
import { users } from './seeders/users';

const app = express();
const port = process.env.PORT || 4000;


import categoriesRoutes from './routes/categoriesRoutes';
import shoppingListRoutes from './routes/shoppingListRoutes';
import userRoutes from './routes/userRoutes';



const initDB = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await Category.bulkCreate(categories);
        console.log('Categories have been added.');

        // await User.bulkCreate(users);
        await User.create({
            username: "shahar",
            password: "123456"
        });
        console.log('Users have been added.');

    } catch (error) {
        console.error('Unable to connect to the database or insert data:', error);
    }

    // finally {
    //     await sequelize.close();
    // }

}





(async () => {
    await sequelize.sync({ force: true });
    // await sequelize.sync();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // enable corse for all origins
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Expose-Headers", "x-total-count");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
        res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

        next();
    });

    app.get('/error', (req: Request, res: Response) => {
        throw new Error('This is a test error');
    });

    app.use('/api/categories', categoriesRoutes);
    app.use('/api/list', shoppingListRoutes);
    app.use('/api/users', userRoutes);

    app.use(strongErrorHandler({
        debug: process.env.NODE_ENV !== 'production',
        log: true,
    }));

    initDB();

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });


})();




