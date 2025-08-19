"use client";

import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

type ExamInfoProps = {
  title: string;
  subject: string;
  date: string;
  totalStudents: number;
  totalQuestions: number;
};

export default function ExamInfo({
  title,
  subject,
  date,
  totalStudents,
  totalQuestions,
}: ExamInfoProps) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        <Grid container spacing={2}>
          <Grid >
            <Typography variant="subtitle1" color="text.secondary">
              Subject
            </Typography>
            <Typography variant="body1">{subject}</Typography>
          </Grid>

          <Grid >
            <Typography variant="subtitle1" color="text.secondary">
              Date
            </Typography>
            <Typography variant="body1">{date}</Typography>
          </Grid>

          <Grid>
            <Typography variant="subtitle1" color="text.secondary">
              Total Students
            </Typography>
            <Typography variant="body1">{totalStudents}</Typography>
          </Grid>

          <Grid>
            <Typography variant="subtitle1" color="text.secondary">
              Total Questions
            </Typography>
            <Typography variant="body1">{totalQuestions}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
