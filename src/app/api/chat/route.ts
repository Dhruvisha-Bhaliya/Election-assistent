import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json({ isFallback: true }, { status: 401 });
    }

    // Official Gemini 1.5 models
    const modelsToTry = [
      "gemini-3-flash-preview",
      "gemini-2.5-flash",
      "gemini-2.5-pro"
    ]; let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: "You are VoterConnect AI. Answer any question accurately. Provide your response in a single, short plain text paragraph. Limit your response to a MAXIMUM of 2 sentences and under 30 words. STRICTLY do not use any markdown formatting (no asterisks, no hashes, no bullet points). Keep it extremely brief and direct.",
        });

        const result = await model.generateContent(message);
        const text = result.response.text();

        if (text) {
          const cleanedText = text.replace(/\n+/g, ' ').replace(/\*/g, '').trim();
          return NextResponse.json({ response: cleanedText });
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} failed, trying next...`);
        lastError = err;
      }
    }

    console.error("All AI Models failed:", lastError);
    return NextResponse.json({ isFallback: true, error: lastError?.message }, { status: 500 });

  } catch (error: any) {
    console.error("AI Chat Error:", error);
    return NextResponse.json({ isFallback: true }, { status: 500 });
  }
}