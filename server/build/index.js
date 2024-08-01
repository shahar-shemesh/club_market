"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const strong_error_handler_1 = __importDefault(require("strong-error-handler"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection_1 = __importDefault(require("./config/connection"));
const Category_1 = __importDefault(require("./models/Category"));
const User_1 = __importDefault(require("./models/User"));
const categories_1 = require("./seeders/categories");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// app.use(shoppingListRoutes);
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const shoppingListRoutes_1 = __importDefault(require("./routes/shoppingListRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.authenticate();
        console.log('Connection has been established successfully.');
        yield Category_1.default.bulkCreate(categories_1.categories);
        console.log('Categories have been added.');
        // await User.bulkCreate(users);
        yield User_1.default.create({
            username: "shahar",
            password: "123456"
        });
        console.log('Users have been added.');
    }
    catch (error) {
        console.error('Unable to connect to the database or insert data:', error);
    }
    // finally {
    //     // סגירת החיבור למסד הנתונים
    //     await sequelize.close();
    // }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.sync({ force: true });
    // await sequelize.sync();
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    // enable corse for all origins
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Expose-Headers", "x-total-count");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
        res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
        next();
    });
    // דוגמה לאמצעי ביניים להוספת שגיאות
    app.get('/error', (req, res) => {
        throw new Error('This is a test error');
    });
    app.use('/api/categories', categoriesRoutes_1.default);
    app.use('/api/list', shoppingListRoutes_1.default);
    app.use('/api/users', userRoutes_1.default);
    // הוספת strong-error-handler כ- middleware לטיפול בשגיאות
    app.use((0, strong_error_handler_1.default)({
        debug: process.env.NODE_ENV !== 'production',
        log: true,
    }));
    initDB();
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}))();
