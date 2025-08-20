"use client";

import React from "react";
import { Card, Typography, Grid } from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Student } from "@/shared-fe/api/exam";
import { useTranslation } from "react-i18next";

type ProgressChartsProps = {
  exam: {
    students: Student[];
  };
};

export default function ProgressCharts({ exam }: ProgressChartsProps) {
  const { t } = useTranslation();

  const totalStudents = exam.students.length;

  // Data for % completed chart
  const completedCount = exam.students.filter((s) => s.status === "Completed").length;
  const inProgressCount = exam.students.filter((s) => s.status === "In Progress").length;
  const notStartedCount = exam.students.filter((s) => s.status === "Not Started").length;

  const pieData = [
    { name: t("progress.completed"), value: completedCount },
    { name: t("progress.inProgress"), value: inProgressCount },
    { name: t("progress.notStarted"), value: notStartedCount },
  ];

  const COLORS = ["#4caf50", "#2196f3", "#f44336"];

  // Data for average score chart
  const avgScore = exam.students.reduce((sum, s) => sum + s.score, 0) / totalStudents || 0;
  const scoreData = [
    { name: t("progress.averageScore"), score: parseFloat(avgScore.toFixed(1)) },
  ];

  return (
    <Grid container spacing={2}>
      {/* Pie Chart: Completion Status */}
      <Grid>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t("progress.completionStatus")}
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      {/* Bar Chart: Average Score */}
      <Grid>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t("progress.averageScore")}
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={scoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
    </Grid>
  );
}
