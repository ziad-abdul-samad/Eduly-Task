"use client";

import { useState, useEffect } from "react";
import { ExamData } from "../api/exam";

type UseExamDataResult = {
  data: ExamData | null;
  isLoading: boolean;
};

export function useExamData(examId: string): UseExamDataResult {
  const [data, setData] = useState<ExamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch exam data from API
  const fetchExamData = async () => {
    try {
      const res = await fetch(`/api/exam?id=${examId}`);
      const json = await res.json();
      setData(json);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch exam data", err);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchExamData();

    // Polling every 4 seconds
    const interval = setInterval(() => {
      fetchExamData();
    }, 4000);

    return () => clearInterval(interval);
  }, [examId]);

  return { data, isLoading };
}
