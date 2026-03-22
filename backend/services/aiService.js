import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeWithAI(resumeText, jobDescription) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing in backend .env");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let prompt;

  if (!jobDescription) {
    // 🔥 GENERAL MODE
    prompt = `
You are a professional ATS system.

Analyze this resume deeply.

Return ONLY JSON (no extra text):
{
  "ats_score": number,
  "strengths": string[],
  "weaknesses": string[],
  "improvement_suggestions": string[],
  "missing_keywords": string[]
}

Resume:
${resumeText}
`;
  } else {
    // 🔥 JOB MATCH MODE
    prompt = `
You are an advanced ATS system.

Understand the job role semantically (not just keyword matching).

Return ONLY JSON:
{
  "ats_score": number,
  "keyword_match_percentage": number,
  "matched_keywords": string[],
  "missing_keywords": string[],
  "recommended_keywords": string[],
  "strengths": string[],
  "weaknesses": string[],
  "improvement_suggestions": string[]
}

Job Description:
${jobDescription}

Resume:
${resumeText}
`;
  }

  const result = await model.generateContent(prompt);

  const response = await result.response;
  const text = response.text();

  return text;
}