import { Router, Request, Response } from 'express';
import User from '../models/User';
import ShoppingList from '../models/ShoppingList';
import { login } from '../controllers/userController';


const router = Router();

router.post('/login', login);


// קבלת כל המשתמשים
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});


// קבלת משתמש לפי ID
router.get('/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});


// יצירת משתמש חדש
router.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.create({ username, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});


// עדכון משתמש קיים
router.put('/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { username, password } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username || user.username;
        user.password = password || user.password;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// מחיקת משתמש
router.delete('/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// קבלת רשימות הקניות של משתמש לפי ID
router.get('/:id/shoppingLists', async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId, {
            include: [ShoppingList]
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.shoppingLists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch shopping lists' });
    }
});

export default router;
