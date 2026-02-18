
import { GoogleGenAI, Type } from "@google/genai";
import { ToneType, EmailResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function rewriteAsBusinessEmail(
  content: string,
  tone: ToneType
): Promise<EmailResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Rewrite the following message into a professional business email in Korean. 
    Target Tone: ${tone}
    Original Message: "${content}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subject: {
            type: Type.STRING,
            description: "A concise and professional email subject line in Korean.",
          },
          body: {
            type: Type.STRING,
            description: "The full body of the rewritten email in Korean.",
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2-3 short tips for the user on why these changes were made.",
          },
        },
        required: ["subject", "body", "tips"],
      },
      systemInstruction: "You are a world-class business communication expert specialized in Korean professional etiquette. You transform messy, informal notes into polished, high-impact business emails that maintain the user's intent while adhering to corporate standards (e.g., proper honorifics, structure, and professional vocabulary)."
    },
  });

  try {
    const data = JSON.parse(response.text);
    return data as EmailResult;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("결과를 생성하는 중 오류가 발생했습니다.");
  }
}
