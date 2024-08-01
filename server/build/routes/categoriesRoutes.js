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
const Category_1 = __importDefault(require("../models/Category"));
const router = (0, express_1.Router)();
// קבלת כל הקטגוריות
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.findAll();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
}));
// הוספת קטגוריה חדשה
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const category = yield Category_1.default.create({ name });
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create category' });
    }
}));
// נתיב למחיקת קטגוריה לפי שם
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryName = req.body.name;
    try {
        // חיפוש הקטגוריה לפי שם
        const category = yield Category_1.default.findOne({ where: { name: categoryName } });
        if (!category) {
            // אם הקטגוריה לא נמצאה, מחזירים 404
            return res.status(404).json({ error: 'Category not found' });
        }
        // מחיקת הקטגוריה
        yield category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the category' });
    }
}));
// // נתיב למחיקת קטגוריה לפי ID
// router.delete('/:id', async (req: Request, res: Response) => {
//     const categoryId = req.params.id;
//     try {
//         // חיפוש הקטגוריה לפי ID
//         const category = await Category.findByPk(categoryId);
//         if (!category) {
//             // אם הקטגוריה לא נמצאה, מחזירים 404
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         // מחיקת הקטגוריה
//         await category.destroy();
//         res.status(200).json({ message: 'Category deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while deleting the category' });
//     }
// });
exports.default = router;
