"use client";

import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import AppBarLayout from "@/components/layout/AppBarLayout";
import ExamInfo from "@/components/dashboard/ExamInfo";
import ProgressCharts from "@/components/dashboard/ProgressCharts";
import StudentGrid from "@/components/dashboard/StudentGrid";
import { useExamData } from "@/shared-fe/hooks/useExamData";

export default function DashboardPage() {
  const { data, isLoading } = useExamData("1"); // examId = 1

  if (isLoading || !data) {
    return (
      <AppBarLayout>
        <Grid container justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Grid>
      </AppBarLayout>
    );
  }

  return (
    <AppBarLayout>
      <Grid container spacing={2}>
        {/* Left side: Exam Info + Charts */}
        <Grid >
          <ExamInfo
            title={data.title}
            subject={data.subject}
            date={data.date}
            totalStudents={data.students.length}
            totalQuestions={data.totalQuestions}
          />
          <ProgressCharts exam={data} />
        </Grid>

        {/* Right side: Student Grid */}
        <Grid >
          <StudentGrid students={data.students} totalQuestions={data.totalQuestions} />
        </Grid>
      </Grid>
    </AppBarLayout>
  );
}
