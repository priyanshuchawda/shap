
import { GoogleGenAI } from "@google/genai";
import { Dimensions } from '../types';

// IMPORTANT: Do NOT configure process.env.API_KEY here.
// It is assumed to be pre-configured in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getExplanation = async (
  topic: 'volume' | 'surfaceArea',
  dimensions: Dimensions,
  calculation: { formula: string; result: number }
): Promise<string> => {
  if (!process.env.API_KEY) {
    return Promise.resolve("API key is not configured. Please set up the API_KEY environment variable.");
  }
  
  const { length, width, height } = dimensions;
  const { formula, result } = calculation;

  const prompt = `
    You are a friendly and encouraging math tutor for middle school students.
    Explain the concept of ${topic} for a rectangular prism with dimensions:
    - Length: ${length} units
    - Width: ${width} units
    - Height: ${height} units

    The calculation is: ${formula} = ${result} ${topic === 'volume' ? 'cubic' : 'square'} units.

    Break down the explanation into simple, easy-to-understand steps.
    For surface area, explain how each pair of faces contributes to the total.
    For volume, use an analogy like counting sugar cubes that would fill the box.
    Keep the tone positive and the language simple. End with a real-world example of where this calculation is useful.
    Do not use markdown formatting like headings or bold text. Use plain paragraphs.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching explanation from Gemini:", error);
    return "I'm having a little trouble explaining that right now. Please check your connection or API key and try again!";
  }
};
