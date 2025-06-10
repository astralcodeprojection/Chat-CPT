import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

// Initialize Gemini with your API key
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_PUBLIC_KEY });

// Get the Gemini model you want to use
export const model = ai.models.get("gemini-2.0-flash");

// Define safety settings
const safetySettings = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_LOW_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_LOW_AND_ABOVE",
  },
];

// Example function to generate content
export async function getGeminiResponse(userInput) {
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: userInput }] }],
    safetySettings,
  });

  // Extract and return the text result
  return result.text();
}