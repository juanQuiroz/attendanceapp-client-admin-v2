"use client";
import React, { useEffect, useState } from "react";
import { eachDayOfInterval, format } from "date-fns";
import { es } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
  AttendanceTeacherResponse,
  TeacherWithAttendance,
} from "@/types/attendance";
import { DatePickerWithRange } from "./date-picker-range";
import { useAttendanceTeacherStore } from "@/store/attendance.store";

export function AttendanceTable({
  data,
}: {
  data?: AttendanceTeacherResponse;
}) {
  const [teachers, setTeachers] = useState<TeacherWithAttendance[]>([]);
  const { dateRange } = useAttendanceTeacherStore();

  // const params = new URLSearchParams({
  //   startDate: format(dateRange.startDate, "yyyy-MM-dd"),
  //   endDate: format(dateRange.endDate, "yyyy-MM-dd"),
  // });

  const days = eachDayOfInterval({
    start: dateRange!.from!,
    end: dateRange!.to!,
  });

  useEffect(() => {
    setTeachers(data ? data.data : []);
  }, [dateRange, data]);

  const formatTime = (time: string | null) => {
    if (!time) return "—";
    const date = new Date(time);
    return formatInTimeZone(date, "America/Lima", "HH:mm:ss");
  };
  return (
    <div className="p-4 bg-white rounded-xl">
      <div className="flex justify-between items-center mb-5">
        <DatePickerWithRange />
        <Button variant={"outline"}>
          <Plus /> Registrar Asistencia
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border">
        <Table className="w-full table-auto border-collapse ">
          <TableHeader className="bg-slate-50 border-b-2 ">
            <TableRow className="max-w-48 ">
              <TableHead rowSpan={2}>Docente</TableHead>
              {days.map((day) => (
                <TableHead className="border" key={day.toString()} colSpan={2}>
                  {formatInTimeZone(day, "America/Lima", "dd MMMM", {
                    locale: es,
                  })}
                </TableHead>
              ))}
            </TableRow>
            <TableRow>
              {days.map((day) => (
                <React.Fragment key={day.toString()}>
                  <TableHead className="border w-min">Entrada</TableHead>
                  <TableHead className="border w-min">Salida</TableHead>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="border px-4 py-2 font-medium">
                  {teacher.fullName}
                </TableCell>
                {days.map((day) => {
                  const record = teacher.attendanceRecords.find(
                    (r) => r.date === format(day, "yyyy-MM-dd")
                  );
                  return (
                    <React.Fragment key={`${teacher.id}-${day.toString()}`}>
                      <TableCell className="border px-2 py-1 text-center">
                        {formatTime(record?.checkin ?? null)}
                      </TableCell>
                      <TableCell className="border px-2 py-1 text-center">
                        {formatTime(record?.checkout ?? null)}
                      </TableCell>
                    </React.Fragment>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
