import { ExamData } from "@/shared-fe/api/exam";
import { z } from "zod";

// Zod validation for API response
const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  completedQuestions: z.number(),
  totalQuestions: z.number(),
  avgTimePerQuestion: z.number(),
  score: z.number(),
  status: z.enum(["In Progress", "Completed", "Not Started"]),
});

const examSchema = z.object({
  id: z.string(),
  title: z.string(),
  subject: z.string(),
  date: z.string(),
  totalStudents: z.number(),
  totalQuestions: z.number(),
  students: z.array(studentSchema),
});

export const fetchExamData = async (examId: string): Promise<ExamData> => {
  const res = await fetch(`../shared-fe/api/exam?id=${examId}`);
  const json = await res.json();

  // validate with zod
  const parsed = examSchema.parse(json);
  return parsed;
};
