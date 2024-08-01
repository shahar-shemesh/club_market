import { Request, Response } from 'express';
import User from '../models/User';


export async function login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user && await user.validatePassword(password)) {
            // התחברות מוצלחת - החזרת ID של המשתמש
            res.status(200).json({ message: 'Login successful', userId: user.id });
        } else {
            // התחברות נכשלה
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        // טיפול בשגיאות כלליות
        res.status(500).json({ error: 'An error occurred during login' });
    }
};