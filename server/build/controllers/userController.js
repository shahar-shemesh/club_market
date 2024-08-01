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
exports.login = login;
const User_1 = __importDefault(require("../models/User"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const user = yield User_1.default.findOne({ where: { username } });
            if (user && (yield user.validatePassword(password))) {
                // התחברות מוצלחת - החזרת ID של המשתמש
                res.status(200).json({ message: 'Login successful', userId: user.id });
            }
            else {
                // התחברות נכשלה
                res.status(401).json({ error: 'Invalid username or password' });
            }
        }
        catch (error) {
            // טיפול בשגיאות כלליות
            res.status(500).json({ error: 'An error occurred during login' });
        }
    });
}
;
