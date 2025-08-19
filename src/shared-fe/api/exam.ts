import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { faker } from '@faker-js/faker';

// Zod schema for validating exam ID
const examSchema = z.object({
  id: z.string(),
});

// Types
export type Student = {
  id: string;
  name: string;
  completedQuestions: number;
  totalQuestions: number;
  avgTimePerQuestion: number;
  score: number;
  status: 'In Progress' | 'Completed' | 'Not Started';
};

export type ExamData = {
  id: string;
  title: string;
  subject: string;
  date: string;
  totalStudents: number;
  totalQuestions: number;
  students: Student[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExamData>
) {
  const examId = req.query.id as string;

  // Validate input
  examSchema.parse({ id: examId || '1' });

  const data: ExamData = {
    id: examId,
    title: 'Math Final Exam',
    subject: 'Mathematics',
    date: new Date().toISOString(),
    totalStudents: 5,
    totalQuestions: 20,
    students: Array.from({ length: 5 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      completedQuestions: faker.number.int({ min: 0, max: 20 }),
      totalQuestions: 20,
      avgTimePerQuestion: faker.number.float({ min: 5, max: 60, fractionDigits: 1 }),
      score: faker.number.int({ min: 0, max: 100 }),
      status: faker.helpers.arrayElement([
        'In Progress',
        'Completed',
        'Not Started',
      ]) as 'In Progress' | 'Completed' | 'Not Started',
    })),
  };

  // Simulate network delay
  setTimeout(() => res.status(200).json(data), 1000);
}
