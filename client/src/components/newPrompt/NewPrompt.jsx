import { GoogleGenerativeAI } from '@google/generative-ai'; // Add this line

import React, { useEffect, useRef, useState } from 'react';
import "./NewPrompt.css";
import arrow from "../../../Public/images/arrow.png"; // Assuming this path is correct
import Upload from '../upload/Upload';
import Markdown from "react-markdown";

// Initialize GoogleGenerativeAI from the global window object (loaded via CDN)
const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_PUBLIC_KEY);
console.log("DEBUG: All import.meta.env variables:", import.meta.env); // NEW LOG
console.log("DEBUG: Initializing AI with API Key:", import.meta.env.VITE_GEMINI_PUBLIC_KEY ? "Key is present (not empty)" : "API Key is empty or undefined!");
console.log("DEBUG: Full AI instance:", ai); // To see the ai object's structure

// Get the GenerativeModel instance once when the component is defined
// This replaces the need for `ai.chats.create` directly.
// You get the model, then you start a chat session *from that model*.
const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" }); // <--- ADDED/CHANGED THIS LINE

const NewPrompt = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [image, setImage] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });

    const chatRef = useRef(null); // This will hold the chat session object

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [question, answer, image.dbData]);

    const runPrompt = async (text, imageData) => {
        try {
            // Set loading state and initial answer
            setAnswer("Generating response..."); // Added this back for user feedback
            // Assuming you want to show a loading spinner, add setLoading(true) here as well
            // setLoading(true); // Uncomment if you have a loading state to manage

            if (!chatRef.current) {
                // <--- PREVIOUSLY: chatRef.current = await ai.chats.create(...)
                // The correct way now is to use model.startChat()
                chatRef.current = model.startChat({ // <--- CHANGED THIS LINE
                    history: [
                        { role: "user", parts: [{ text: "Hello!" }] },
                        { role: "model", parts: [{ text: "How can I help you today?" }] }
                    ]
                });
                console.log("Chat context created:", chatRef.current);
            }

            const contentParts = [];

            if (text && text.trim()) {
                contentParts.push({
                    text: text.trim(),
                });
            }

            if (imageData && imageData.data && imageData.mimeType) {
                contentParts.push({
                    inlineData: {
                        mimeType: imageData.mimeType,
                        data: imageData.data,
                    },
                });
            }

            console.log("Prepared contentParts:", contentParts); // This is an array of parts

            if (contentParts.length === 0) {
                throw new Error("Content parts array cannot be empty.");
            }

            const messageContent = {
                contents: [{
                    role: 'user', // Always a user role for content you send to the model
                    parts: contentParts
                }]
            };

            console.log("Final messageContent structure for sendMessageStream:", JSON.stringify(messageContent, null, 2));

            const result = await chatRef.current.sendMessageStream(contentParts); // <--- PASS contentParts DIRECTLY
            
            let aiAnswer = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                if (chunkText) {
                    aiAnswer += chunkText;
                    setAnswer(aiAnswer);
                }
            }
        } catch (error) {
            console.error("Error in runPrompt:", error);
            setAnswer("Error generating response.");
        } finally {
            // setLoading(false); // Uncomment if you manage a loading state
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const text = e.target.prompt.value.trim();
        if (!text && (!image.aiData || Object.keys(image.aiData).length === 0)) {
            return;
        }

        setQuestion(text); // Set user's question before generating answer

        await runPrompt(text, image.aiData); // Ensure runPrompt completes before clearing

        e.target.prompt.value = "";
        setImage({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
        });
    };

    return (
        <>
            {image.isLoading && (<div>Loading image...</div>)}

            {image.dbData?.filePath && (
                <img
                    src={`${import.meta.env.VITE_IMAGE_KIT_ENDPOINT}${image.dbData.filePath}`}
                    alt="Uploaded Image"
                    className="attachmentImage"
                />
            )}

            {question && <div className="message user"><Markdown>{question}</Markdown></div>}
            {answer && <div className="message"><Markdown>{answer}</Markdown></div>} {/* Display answer here */}

            <form className='newForm' onSubmit={handleSubmit}>
                <Upload setImage={setImage} />
                <input type="file" id="file" hidden multiple={false} className="newFormInput" />
                <input type="text" placeholder="Ask me anything..." className="newFormInput" name="prompt" />
                <button className="newFormButton" type="submit">
                    <img src={arrow} alt="Submit" className="newFormButtonImage" />
                </button>
            </form>

            <div ref={endRef} className="endChat" />
        </>
    );
};

export default NewPrompt;