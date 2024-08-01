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
const ShoppingList_1 = __importDefault(require("../models/ShoppingList"));
const Product_1 = __importDefault(require("../models/Product"));
const connection_1 = __importDefault(require("../config/connection"));
const router = (0, express_1.Router)();
// קבלת כל רשימות הקניות
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shoppingLists = yield ShoppingList_1.default.findAll();
        res.json(shoppingLists);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch shopping lists' });
    }
}));
// קבלת רשימת קניות לפי ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingListId = req.params.id;
    try {
        const shoppingList = yield ShoppingList_1.default.findByPk(shoppingListId);
        if (!shoppingList) {
            return res.status(404).json({ error: 'Shopping list not found' });
        }
        res.json(shoppingList);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch shopping list' });
    }
}));
// עדכון רשימת קניות קיימת
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingListId = req.params.id;
    const { user_id } = req.body;
    try {
        const shoppingList = yield ShoppingList_1.default.findByPk(shoppingListId);
        if (!shoppingList) {
            return res.status(404).json({ error: 'Shopping list not found' });
        }
        shoppingList.user_id = user_id || shoppingList.user_id;
        yield shoppingList.save();
        res.json(shoppingList);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update shopping list' });
    }
}));
// מחיקת רשימת קניות
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingListId = req.params.id;
    try {
        const shoppingList = yield ShoppingList_1.default.findByPk(shoppingListId);
        if (!shoppingList) {
            return res.status(404).json({ error: 'Shopping list not found' });
        }
        yield shoppingList.destroy();
        res.status(200).json({ message: 'Shopping list deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete shopping list' });
    }
}));
// קבלת כל המוצרים עבור רשימת קניות לפי shoppingList_id
router.get('/:id/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingListId = req.params.id;
    try {
        // חיפוש רשימת הקניות לפי ID והבאת המוצרים המשויכים לה
        const shoppingList = yield ShoppingList_1.default.findByPk(shoppingListId, {
            include: [Product_1.default]
        });
        if (!shoppingList) {
            return res.status(404).json({ error: 'Shopping list not found' });
        }
        // מחזירים את המוצרים ברשימת הקניות
        res.json(shoppingList.products);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}));
// יצירת רשימת קניות חדשה עם מוצרים
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, products } = req.body;
    // התחלת טרנזקציה
    const transaction = yield connection_1.default.transaction();
    try {
        // יצירת רשימת הקניות החדשה
        const shoppingList = yield ShoppingList_1.default.create({ user_id }, { transaction });
        // הוספת המוצרים לרשימת הקניות
        if (products && products.length > 0) {
            for (const productData of products) {
                yield Product_1.default.create({
                    shoppingList_id: shoppingList.id,
                    name: productData.name,
                    category_id: productData.category_id,
                    amount: productData.amount
                }, { transaction });
            }
        }
        // השלמת הטרנזקציה
        yield transaction.commit();
        res.status(201).json(shoppingList);
    }
    catch (error) {
        // ביטול הטרנזקציה במקרה של שגיאה
        yield transaction.rollback();
        res.status(500).json({ error: 'Failed to create shopping list with products' });
    }
}));
exports.default = router;
