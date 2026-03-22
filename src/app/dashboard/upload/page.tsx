"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, ArrowRight } from "lucide-react";

import { useApp, ResumeAnalysis } from "@/context/AppContext";
import DashboardLayout from "@/components/DashboardLayout";
import { analyzeResume } from "@/lib/api";

export default function UploadPage() {
  const { isAuthenticated, addAnalysis, setIsAnalyzing } = useApp();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzingLocal] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const simulateProgress = () => {
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 8;
      if (value >= 95) clearInterval(interval);
      setProgress(Math.min(value, 95));
    }, 200);
    return interval;
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setAnalyzingLocal(true);
    setIsAnalyzing(true);

    const interval = simulateProgress();

    try {
      const result = await analyzeResume(
        file,
        jobDescription.trim() || null
      );

      const ai = JSON.parse(result.analysis);

      clearInterval(interval);
      setProgress(100);

      const analysis: ResumeAnalysis = {
        id: `analysis_${Date.now()}`,
        fileName: file.name,
        uploadDate: new Date().toISOString().split("T")[0],
        atsScore: ai.ats_score,
        summary: "AI analyzed resume",
        strengths: ai.strengths || [],
        weakAreas: ai.weaknesses || [],
        sectionFeedback: [],
        bulletPoints: [],
        keywordAnalysis: {
          matchPercentage: ai.keyword_match_percentage || 0,
          matchedKeywords: ai.matched_keywords || [],
          missingKeywords: ai.missing_keywords || [],
          recommendedKeywords: ai.recommended_keywords || [],
          jobDescription: jobDescription,
        },
      };

      addAnalysis(analysis);

      router.push(`/dashboard/analysis/${analysis.id}`);
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    }

    setAnalyzingLocal(false);
    setIsAnalyzing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">

        <h1 className="text-2xl font-bold">Analyze Resume</h1>

        {/* Upload */}
        {!file && (
          <div
            {...getRootProps()}
            className="border-2 border-dashed p-10 text-center rounded-xl cursor-pointer"
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto mb-3" />
            <p>Upload Resume (PDF)</p>
          </div>
        )}

        {/* File Preview */}
        {file && (
          <div className="p-4 border rounded-xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FileText />
              {file.name}
            </div>
            <button onClick={() => setFile(null)}>
              <X />
            </button>
          </div>
        )}

        {/* 🔥 OPTIONAL JD */}
        <textarea
          placeholder="Paste Job Description (Optional)"
          className="w-full p-3 border rounded-xl"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          className="w-full bg-amber-500 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          Analyze Resume
          <ArrowRight size={16} />
        </button>

        {/* Progress */}
        {analyzing && (
          <div className="w-full bg-stone-200 h-2 rounded-full">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}