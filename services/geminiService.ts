import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini API client directly using the environment variable.
// Creating instance inside the function to ensure the most up-to-date key is used if needed,
// though here we follow the "constant at top" pattern for general utility.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSoulAlignment = async (userFeeling: string): Promise<{ mantra: string; recommendation: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user feels: "${userFeeling}".
      You are a metaphysical pilates instructor for a studio called "Leen On Christ".
      Provide a response in JSON format containing:
      1. A short, poetic, spiritual affirmation/mantra (max 15 words).
      2. A recommended pilates class style (e.g., "Power Reformer", "Angelic Flow", "Grounding Mat").
      The tone should be ethereal, supportive, and rooted in the idea that the body is a temple.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mantra: { type: Type.STRING },
            recommendation: { type: Type.STRING }
          },
          required: ["mantra", "recommendation"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("AI Error:", error);
    // Graceful fallback for the ethereal experience.
    return {
      mantra: "Your presence is a prayer, and your breath is the song of your soul.",
      recommendation: "Angelic Flow Reformer"
    };
  }
};