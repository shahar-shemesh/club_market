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

# חשיפת הפורט שהאפליקציה רצה עליו
EXPOSE 4000

# הפעלת האפליקציה
CMD ["npm", "start"]
