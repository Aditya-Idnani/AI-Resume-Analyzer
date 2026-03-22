# 🚀 ResumeAI – AI-Powered Resume Analyzer

> Analyze your resume like a recruiter. Beat ATS filters. Land more interviews.

---

## 📌 Overview

**ResumeAI** is a full-stack AI-powered web application that analyzes resumes and provides actionable insights to improve ATS (Applicant Tracking System) compatibility.

It goes beyond basic keyword matching by understanding **context, skills, and job requirements** using AI.

---

## ✨ Features

### 🔐 Authentication

* Email & password login
* Google OAuth (Supabase)
* Secure session handling

### 📄 Resume Upload & Parsing

* Upload PDF / DOCX resumes
* Automatic text extraction
* Intelligent section detection (skills, experience, etc.)

### 🤖 AI-Powered Analysis

* ATS compatibility score
* Strengths & weaknesses breakdown
* Resume summary insights
* AI-driven feedback

### 🎯 Smart Keyword Matching

* Context-aware keyword extraction
* Matches resume with job description
* Shows:

  * ✅ Matched keywords
  * ❌ Missing keywords
  * 💡 Recommended skills

### 📊 Beautiful Dashboard

* Clean SaaS-style UI
* Progress indicators
* Real-time analysis display
* Persistent user sessions

---

## 🧠 How It Works

1. User uploads resume
2. Backend extracts text (PDF/DOCX)
3. Resume is parsed into structured sections
4. AI (Gemini API) analyzes:

   * Skills
   * Experience
   * Relevance to job description
5. Results are returned with:

   * ATS score
   * Keyword insights
   * Suggestions

---

## 🛠️ Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Multer (file upload)
* pdf-parse & mammoth (text extraction)

### AI

* Google Gemini API

### Auth & Database

* Supabase

---

## 📁 Project Structure

```
AI-Resume-Analyser/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   └── server.js
│
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── signup/
│   │   └── page.tsx
│   │
│   ├── components/
│   ├── context/
│   └── lib/
│
├── public/
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/resume-ai.git
cd resume-ai
```

---

### 2️⃣ Install Dependencies

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

### 3️⃣ Environment Variables

#### 📁 Frontend (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

#### 📁 Backend (.env)

```env
GEMINI_API_KEY=your_gemini_key
PORT=5050
```

---

### 4️⃣ Run Project

#### Start Backend

```bash
cd backend
npm run dev
```

#### Start Frontend

```bash
npm run dev
```

---

### 5️⃣ Open App

```
http://localhost:3000
```

---

## 🧪 Demo Flow

1. Sign up / Login
2. Upload your resume
3. (Optional) Add job description
4. Click **Analyze**
5. View:

   * ATS Score
   * Keyword Match
   * Suggestions

---

## 🚧 Current Limitations

* AI response formatting may vary
* Keyword matching still evolving
* Resume parsing can improve for complex formats

---

## 🔮 Future Improvements

* 🔥 Advanced ATS scoring model
* 📊 Resume version comparison
* 🧠 Skill clustering & ranking
* 📈 Interview probability prediction
* 🌍 Multi-language resume support

---

## 🤝 Contributing

Pull requests are welcome!
Feel free to open issues for bugs or feature suggestions.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Aditya Idnani**
Passionate about building impactful AI-powered products 🚀

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub and share it!

---
