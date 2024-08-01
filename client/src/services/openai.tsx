import OpenAI from "openai";

// יצירת מופע של מחלקת OpenAI עם מפתח API
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // קבלת מפתח ה-API מקובץ .env
    dangerouslyAllowBrowser: true,
});

export const fetchChatGPTResponse = async (message: string) => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
    });

    return (completion.choices[0].message.content);
};
