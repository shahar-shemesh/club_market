import React, { useState, useEffect, useRef } from 'react';
import { TextField, Typography, Box, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IncomingMsg from './IncomingMsg';
import OutcomingMsg from './OutcomingMsg';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

interface Message {
    content: string;
    role: 'user' | 'assistant';
}

const Assistant: React.FC = () => {
    const [input, setInput] = useState("");
    const [conversation, setConversation] = useState<Message[]>([]);
    const chatEndRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
        scrollToBottom();
    }, [conversation]);


    useEffect(() => {
        const savedConversation = localStorage.getItem("conversation");
        if (savedConversation) {
            setConversation(JSON.parse(savedConversation));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("conversation", JSON.stringify(conversation));
    }, [conversation]);

    const handleSubmit = async () => {
        if (input.trim()) {
            const userMessage = { content: input, role: 'user' } as Message;
            setConversation(prev => [...prev, userMessage]);
            setInput("");

            try {
                const completion = await openai.chat.completions.create({
                    messages: [...conversation, userMessage].map(msg => ({
                        role: msg.role,
                        content: msg.content
                    })),
                    model: "gpt-3.5-turbo",
                });
                const assistantMessage = { content: completion.choices[0].message.content, role: 'assistant' } as Message;
                setConversation(prev => [...prev, assistantMessage]);
            } catch (error) {
                console.error("Failed to fetch response:", error);
                const errorMessage = { content: "There was an error fetching the response.", role: 'assistant' } as Message;
                setConversation(prev => [...prev, errorMessage]);
            }
        }
    };


    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };


    return (
        <Box
            sx={{
                textAlign: 'right',
                gridArea: 'rocky',
                display: 'flex',
                flexDirection: 'column',
                width: {xs: '100vw', md: 'auto'}
            }}
        >
            <Typography
                sx={{
                    color: 'text.primary',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    textAlign: 'right'
                }}
            >
                דברו עם רוקי
            </Typography>

            <Box mx={{
                maxHeight: '30vh',
                borderRadius: '20px',
                border: '2px solid',
                borderColor: '#daf5eb',
            }}>

                <Box
                    sx={{
                        padding: 6,
                        maxHeight: '80%',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {conversation.map((msg, index) =>
                        msg.role === 'assistant' ? (
                            <IncomingMsg key={index} message={msg.content} />
                        ) : (
                            <OutcomingMsg key={index} message={msg.content} />
                        )
                    )}
                    <div ref={chatEndRef} />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '2px solid',
                        borderColor: 'secondary.main',
                        borderRadius: '2rem',
                        padding: '0 5px',
                        ml: 4,
                        mr: 4,

                    }}
                >
                    <IconButton sx={{ color: '#ffff', ml: 2, backgroundColor: 'primary.main', scale: '0.75' }} onClick={handleSubmit}>
                        <ArrowBackIcon />
                    </IconButton>
                    <TextField
                        variant="standard"
                        placeholder="דבר איתי"
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        InputProps={{ disableUnderline: true }}
                        sx={{ mr: 3, direction: 'rtl' }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Assistant;
