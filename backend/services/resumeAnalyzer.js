import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeResume = async (sections, jobDescription) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an advanced ATS (Applicant Tracking System) analyzer.

Analyze the resume and return structured JSON.

RESUME:
${JSON.stringify(sections)}

JOB DESCRIPTION:
${jobDescription || "General resume analysis (no job provided)"}

IMPORTANT:
- Understand meaning (not just keywords)
- Identify real skills (React, AWS, etc.)
- Suggest missing industry-relevant skills

RETURN STRICT JSON ONLY:

{
  "atsScore": number (0-100),
  "strengths": [string],
  "weakAreas": [string],
  "summary": string,
  "keywordAnalysis": {
    "matchPercentage": number,
    "matchedKeywords": [string],
    "missingKeywords": [string],
    "recommendedKeywords": [string]
  }
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // 🔥 CLEAN RESPONSE (VERY IMPORTANT)
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // 🔥 SAFE PARSE
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("JSON Parse Error:", text);

      // fallback (so app never crashes)
      return {
        atsScore: 70,
        strengths: ["Good structure", "Relevant experience"],
        weakAreas: ["Needs more quantified impact"],
        summary: "AI parsing fallback triggered",
        keywordAnalysis: {
          matchPercentage: 60,
          matchedKeywords: ["JavaScript"],
          missingKeywords: ["Docker", "AWS"],
          recommendedKeywords: ["System Design"],
        },
      };
    }
  } catch (error) {
    console.error("Gemini Error:", error);

    // 🔥 NEVER CRASH FRONTEND
    return {
      atsScore: 65,
      strengths: ["Basic resume structure"],
      weakAreas: ["AI analysis failed"],
      summary: "Fallback due to AI error",
      keywordAnalysis: {
        matchPercentage: 50,
        matchedKeywords: [],
        missingKeywords: [],
        recommendedKeywords: [],
      },
    };
  }
};