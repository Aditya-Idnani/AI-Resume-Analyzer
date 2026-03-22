import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const improveBullet = async (bulletPoint) => {

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest"
    });

    const prompt = `
You are a resume expert.

Rewrite the following resume bullet point to make it stronger.

Rules:
- Use action verbs
- Add measurable impact if possible
- Make it ATS friendly
- Keep it concise

Original Bullet:
${bulletPoint}

Return only the improved bullet.
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    return text;

  } catch (error) {

    console.error("Bullet improvement error:", error);

    throw error;

  }

};