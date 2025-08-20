"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Student } from "@/shared-fe/api/exam";
import { useTranslation } from "react-i18next";

type StudentGridProps = {
  students: Student[];
  totalQuestions: number;
};

type Order = "asc" | "desc";

export default function StudentGrid({
  students,
  totalQuestions,
}: StudentGridProps) {
  const { t } = useTranslation();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Student>("name");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Sorting function
  const handleSort = (property: keyof Student) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedStudents = [...students].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (orderBy) {
      case "name":
      case "status":
        aValue = a[orderBy];
        bValue = b[orderBy];
        return order === "asc"
          ? (aValue as string).localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue as string);

      case "score":
      case "completedQuestions":
      case "avgTimePerQuestion":
        aValue = a[orderBy];
        bValue = b[orderBy];
        return order === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);

      default:
        return 0;
    }
  });

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  {t("studentGrid.name")}
                </TableSortLabel>
              </TableCell>
              <TableCell>{t("studentGrid.completedQuestions")}</TableCell>
              <TableCell>{t("studentGrid.avgTimePerQuestion")}</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "score"}
                  direction={orderBy === "score" ? order : "asc"}
                  onClick={() => handleSort("score")}
                >
                  {t("studentGrid.score")}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "status"}
                  direction={orderBy === "status" ? order : "asc"}
                  onClick={() => handleSort("status")}
                >
                  {t("studentGrid.status")}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStudents.map((student) => (
              <TableRow
                key={student.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => setSelectedStudent(student)}
              >
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  {student.completedQuestions}/{totalQuestions}
                </TableCell>
                <TableCell>{student.avgTimePerQuestion.toFixed(1)}</TableCell>
                <TableCell>{student.score}</TableCell>
                <TableCell>{student.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for student details */}
      <Dialog
        open={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
      >
        <DialogTitle>{t("studentGrid.studentDetails")}</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <>
              <DialogContentText>
                {t("studentGrid.name")}: {selectedStudent.name}
              </DialogContentText>
              <DialogContentText>
                {t("studentGrid.completedQuestions")}: {selectedStudent.completedQuestions}/
                {totalQuestions}
              </DialogContentText>
              <DialogContentText>
                {t("studentGrid.avgTimePerQuestion")}:{" "}
                {selectedStudent.avgTimePerQuestion.toFixed(1)} s
              </DialogContentText>
              <DialogContentText>
                {t("studentGrid.score")}: {selectedStudent.score}
              </DialogContentText>
              <DialogContentText>
                {t("studentGrid.status")}: {selectedStudent.status}
              </DialogContentText>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
