"use client";

import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useI18n } from "@/context/I18nContext"; // adjust the path if needed

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
  const { t } = useI18n();

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        <Grid container spacing={2}>
          <Grid>
            <Typography variant="subtitle1" color="text.secondary">
              {t("subject")}
            </Typography>
            <Typography variant="body1">{subject}</Typography>
          </Grid>

          <Grid>
            <Typography variant="subtitle1" color="text.secondary">
              {t("date")}
            </Typography>
            <Typography variant="body1">{date}</Typography>
          </Grid>

          <Grid>
            <Typography variant="subtitle1" color="text.secondary">
              {t("totalStudents")}
            </Typography>
            <Typography variant="body1">{totalStudents}</Typography>
          </Grid>

          <Grid>
            <Typography variant="subtitle1" color="text.secondary">
              {t("totalQuestions")}
            </Typography>
            <Typography variant="body1">{totalQuestions}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
