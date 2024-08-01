# שימוש בתמונת בסיס Node.js
FROM node

# הגדרת תיקיית העבודה
WORKDIR /app

# העתקת package.json ו-package-lock.json
COPY package*.json ./

# התקנת התלויות
RUN npm install

# העתקת שאר הקבצים
COPY . .

# בניית האפליקציה
RUN npm run build

# התקנת שרת סטטי
RUN npm install -g serve

# חשיפת הפורט שהאפליקציה רצה עליו
EXPOSE 3000

# הפעלת האפליקציה
CMD ["npm", "start"]
