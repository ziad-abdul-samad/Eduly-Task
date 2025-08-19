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

type StudentGridProps = {
  students: Student[];
  totalQuestions: number;
};

type Order = "asc" | "desc";

export default function StudentGrid({
  students,
  totalQuestions,
}: StudentGridProps) {
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
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Completed Questions</TableCell>
              <TableCell>Avg Time / Question (s)</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "score"}
                  direction={orderBy === "score" ? order : "asc"}
                  onClick={() => handleSort("score")}
                >
                  Score
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "status"}
                  direction={orderBy === "status" ? order : "asc"}
                  onClick={() => handleSort("status")}
                >
                  Status
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
        <DialogTitle>Student Details</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <>
              <DialogContentText>
                Name: {selectedStudent.name}
              </DialogContentText>
              <DialogContentText>
                Completed Questions: {selectedStudent.completedQuestions}/
                {totalQuestions}
              </DialogContentText>
              <DialogContentText>
                Avg Time per Question:{" "}
                {selectedStudent.avgTimePerQuestion.toFixed(1)} s
              </DialogContentText>
              <DialogContentText>
                Score: {selectedStudent.score}
              </DialogContentText>
              <DialogContentText>
                Status: {selectedStudent.status}
              </DialogContentText>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
