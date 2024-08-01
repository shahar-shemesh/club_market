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
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const ShoppingList_1 = __importDefault(require("../models/ShoppingList"));
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// נתיב התחברות
router.post('/login', userController_1.login);
// קבלת כל המשתמשים
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}));
// קבלת משתמש לפי ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}));
// יצירת משתמש חדש
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.default.create({ username, password });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}));
// עדכון משתמש קיים
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { username, password } = req.body;
    try {
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.username = username || user.username;
        user.password = password || user.password;
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
}));
// מחיקת משתמש
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        yield user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}));
// קבלת רשימות הקניות של משתמש לפי ID
router.get('/:id/shoppingLists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield User_1.default.findByPk(userId, {
            include: [ShoppingList_1.default]
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.shoppingLists);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch shopping lists' });
    }
}));
exports.default = router;
