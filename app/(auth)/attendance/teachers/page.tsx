"use client";
import { AttendanceTable } from "@/components/attendance-table";
import { useAttendanceTeachers } from "@/hooks/queries/use-attendance";
import React from "react";

function AttendanceTeachersPage() {
  const { data: attendaceTeachers } = useAttendanceTeachers();

  return (
    <>
      <AttendanceTable data={attendaceTeachers} />
    </>
  );
}

export default AttendanceTeachersPage;
