import { Router, Request, Response } from 'express';
import ShoppingList from '../models/ShoppingList';
import Product from '../models/Product';
import sequelize from '../config/connection';

const router = Router();


// קבלת כל רשימות הקניות
router.get('/', async (req: Request, res: Response) => {
    try {
        const shoppingLists = await ShoppingList.findAll();
        res.json(shoppingLists);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch shopping lists' });
    }
});


// קבלת רשימת קניות לפי ID
router.get('/:id', async (req: Request, res: Response) => {
    const shoppingListId = req.params.id;

    try {
        const shoppingList = await ShoppingList.findByPk(shoppingListId);
        if (!shoppingList) {
            return res.status(404).json({ error: 'Shopping list not found' });
        }
        res.json(shoppingList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch shopping list' });
    }
});


// עדכון רשימת קניות קיימת
router.put('/:id', async (req: Request, res: Response) => {
    const shoppingListId = req.params.id;
    const { user_id } = req.body;

    try {
        const shoppingList = await ShoppingList.findByPk(shoppingListId);
        if (!shoppingList) {
            return res.status(404).json({ error: 'Shopping list not found' });
        }

        shoppingList.user_id = user_id || shoppingList.user_id;

        await shoppingList.save();
        res.json(shoppingList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update shopping list' });
    }
});

// מחיקת רשימת קניות
router.delete('/:id', async (req: Request, res: Response) => {
    const shoppingListId = req.params.id;

    try {
        const shoppingList = await ShoppingList.findByPk(shoppingListId);
        if (!shoppingList) {
            return res.status(404).json({ error: 'Shopping list not found' });
        }

        await shoppingList.destroy();
        res.status(200).json({ message: 'Shopping list deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete shopping list' });
    }
});



// קבלת כל המוצרים עבור רשימת קניות לפי shoppingList_id
router.get('/:id/products', async (req: Request, res: Response) => {
    const shoppingListId = req.params.id;

    try {
        // חיפוש רשימת הקניות לפי ID והבאת המוצרים המשויכים לה
        const shoppingList = await ShoppingList.findByPk(shoppingListId, {
            include: [Product]
        });

        if (!shoppingList) {
            return res.status(404).json({ error: 'Shopping list not found' });
        }

        // מחזירים את המוצרים ברשימת הקניות
        res.json(shoppingList.products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});



// יצירת רשימת קניות חדשה עם מוצרים
router.post('/', async (req: Request, res: Response) => {
    const { user_id, products } = req.body;

    // התחלת טרנזקציה
    const transaction = await sequelize.transaction();

    try {
        // יצירת רשימת הקניות החדשה
        const shoppingList = await ShoppingList.create(
            { user_id },
            { transaction }
        );

        // הוספת המוצרים לרשימת הקניות
        if (products && products.length > 0) {
            for (const productData of products) {
                await Product.create(
                    {
                        shoppingList_id: shoppingList.id,
                        name: productData.name,
                        category_id: productData.category_id,
                        amount: productData.amount
                    },
                    { transaction }
                );
            }
        }

        // השלמת הטרנזקציה
        await transaction.commit();
        res.status(201).json(shoppingList);
    } catch (error) {
        // ביטול הטרנזקציה במקרה של שגיאה
        await transaction.rollback();
        res.status(500).json({ error: 'Failed to create shopping list with products' });
    }
});






export default router;
