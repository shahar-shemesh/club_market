import { Router, Request, Response } from 'express';
import Category from '../models/Category';


const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});


router.post('/', async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create category' });
    }
});


router.delete('/', async (req: Request, res: Response) => {
    const categoryName = req.body.name;
    try {
        const category = await Category.findOne({ where: { name: categoryName } });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the category' });
    }
});



export default router;
