"use client";
import { AttendanceTable } from "@/components/attendance-table";
import { useAttendanceTeachers } from "@/hooks/queries/use-attendance";
import React from "react";

function AttendanceTeachersPage() {
  const { data: attendaceTeachers } = useAttendanceTeachers();

  return (
    <>
      {attendaceTeachers ? <AttendanceTable data={attendaceTeachers} /> : null}
    </>
  );
}

export default AttendanceTeachersPage;
