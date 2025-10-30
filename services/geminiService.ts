import { GoogleGenAI, Type } from "@google/genai";
import { Quote } from '../types';

export async function generateSalesQuote(): Promise<Quote> {
  if (!process.env.API_KEY) {
    throw new Error("Gemini API key not found. Please set the API_KEY as an environment variable in your deployment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `You are an expert quote generator. Your sole purpose is to provide a single, powerful, and concise sales quote from a famous successful person (e.g., a CEO, entrepreneur, or sales guru like Zig Ziglar, Brian Tracy, or Mark Cuban). The quote should be inspiring and motivational for a salesperson. You must only respond with a JSON object with two keys: 'quote' and 'author'. Do not provide any other text or explanation.`;
  
  const userPrompt = `Generate a new sales quote.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: {
              type: Type.STRING,
              description: "The motivational sales quote.",
            },
            author: {
              type: Type.STRING,
              description: "The author of the quote.",
            },
          },
          required: ["quote", "author"],
        },
        temperature: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const quoteData: Quote = JSON.parse(jsonText);
    return quoteData;
  } catch (error) {
    console.error("Error generating sales quote:", error);
    throw new Error("Failed to generate a quote. Please try again.");
  }
}