// src/app/api/exam/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { faker } from '@faker-js/faker';

// Zod schema
const examSchema = z.object({ id: z.string() });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') || '1';

  examSchema.parse({ id });

  const data = {
    id,
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
      status: faker.helpers.arrayElement(['In Progress', 'Completed', 'Not Started']),
    })),
  };

  return NextResponse.json(data);
}
