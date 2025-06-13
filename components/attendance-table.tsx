"use client";
import React, { useEffect, useState } from "react";
import { eachDayOfInterval, format } from "date-fns";
import { es } from "date-fns/locale";

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
import { formatDateInLima, formatTimeInLima } from "@/lib/timezone";

export function AttendanceTable({
  data,
}: {
  data?: AttendanceTeacherResponse;
}) {
  const [teachers, setTeachers] = useState<TeacherWithAttendance[]>([]);
  const { dateRange } = useAttendanceTeacherStore();

  useEffect(() => {
    setTeachers(data ? data.data : []);
  }, [dateRange, data]);

  if (!dateRange || !dateRange.from || !dateRange.to) {
    return (
      <div className="p-4 text-center">
        Seleccione un rango de fechas válido
      </div>
    );
  }

  const days = eachDayOfInterval({
    start: dateRange?.from,
    end: dateRange?.to,
  });

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
            <TableRow className="max-w-48">
              <TableHead rowSpan={2} className="font-bold text-slate-700 px-4">
                Docente
              </TableHead>
              {days.map((day) => (
                <TableHead
                  className="border text-center font-bold text-slate-700 py-1"
                  key={day.toString()}
                  colSpan={2}
                >
                  <span className="text-xs">
                    {format(day, "EEEE", { locale: es })}
                  </span>{" "}
                  <br />
                  <span className="text-md font-bold">
                    {format(day, "dd MMMM", { locale: es })}
                  </span>
                </TableHead>
              ))}
            </TableRow>
            <TableRow>
              {days.map((day) => (
                <React.Fragment key={day.toString()}>
                  <TableHead className="border w-min text-slate-600 text-center">
                    Entrada
                  </TableHead>
                  <TableHead className="border w-min text-slate-600 text-center ">
                    Salida
                  </TableHead>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="border px-4 py-2 font-medium hover:cursor-pointer hover:text-blue-500">
                  {teacher.fullName}
                </TableCell>
                {days.map((day) => {
                  // const records = teacher.attendanceRecords.filter((r) => {
                  //   if (!r.date) return false;
                  //   try {
                  //     const recordDate = new Date(r.date);
                  //     return (
                  //       format(recordDate, "yyyy-MM-dd") ===
                  //       format(day, "yyyy-MM-dd")
                  //     );
                  //   } catch {
                  //     return false;
                  //   }

                  const records = teacher.attendanceRecords.filter((r) => {
                    return (
                      formatDateInLima(r.date) === format(day, "yyyy-MM-dd")
                    );
                  });

                  return (
                    <React.Fragment key={`${teacher.id}-${day.toISOString()}`}>
                      <TableCell className="border px-2 py-1 text-center whitespace-pre-line">
                        {records.length > 0
                          ? records
                              .map((r) =>
                                r.checkin ? formatTimeInLima(r.checkin) : "--"
                              )
                              .join("\n")
                          : "--"}
                      </TableCell>
                      <TableCell className="border px-2 py-1 text-center whitespace-pre-line">
                        {records.length > 0
                          ? records
                              .map((r) =>
                                r.checkout ? formatTimeInLima(r.checkout) : "--"
                              )
                              .join("\n")
                          : "--"}
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
