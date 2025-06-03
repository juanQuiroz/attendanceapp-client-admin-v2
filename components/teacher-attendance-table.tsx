"use client";

import React, { useEffect, useState } from "react";
import { eachDayOfInterval, format } from "date-fns";
import { es } from "date-fns/locale";
// import { TeacherWithAttendance } from "@/types";

// types.ts
export type AttendanceRecord = {
  date: string; // formato "2025-06-01"
  checkIn: string | null;
  checkOut: string | null;
};

export type TeacherWithAttendance = {
  id: string;
  fullName: string;
  attendanceRecords: AttendanceRecord[];
};

type DateRange = {
  startDate: Date;
  endDate: Date;
};

export default function AttendanceTable() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [teachers, setTeachers] = useState<TeacherWithAttendance[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      startDate: format(dateRange.startDate, "yyyy-MM-dd"),
      endDate: format(dateRange.endDate, "yyyy-MM-dd"),
    });

    // const res = await fetch(`/api/attendance-records-teachers/range?${params}`);
    // const json = await res.json();
    setTeachers([
      {
        id: "1",
        fullName: "Juan Pérez",
        attendanceRecords: [
          {
            date: "2025-06-01",
            checkIn: "07:45",
            checkOut: "13:00",
          },
          {
            date: "2025-06-02",
            checkIn: "07:50",
            checkOut: "13:50",
          },
        ],
      },
      {
        id: "2",
        fullName: "María García",
        attendanceRecords: [],
      },
    ]);
    // setTeachers(json.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const days = eachDayOfInterval({
    start: dateRange.startDate,
    end: dateRange.endDate,
  });

  const formatTime = (time: string | null) => (time ? time : "—");

  return (
    <div className="overflow-auto border rounded-xl p-4 shadow">
      {/* Aquí va tu DateRangePicker */}
      {/* Puedes usar tu propio componente o uno de Shadcn UI */}
      {/* Simulado temporalmente con botones */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() =>
            setDateRange({
              startDate: new Date("2025-06-01"),
              endDate: new Date("2025-06-07"),
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Semana 1 (01-07 Jun)
        </button>
        <button
          onClick={() =>
            setDateRange({
              startDate: new Date("2025-06-10"),
              endDate: new Date("2025-06-15"),
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Semana 2 (10-15 Jun)
        </button>
      </div>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <table className="min-w-max table-auto border-collapse text-sm bg-white rounded-xl">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-100" rowSpan={2}>
                Docente
              </th>
              {days.map((day) => (
                <th
                  className="border px-4 py-2 bg-gray-100 text-center"
                  colSpan={2}
                  key={day.toString()}
                >
                  {format(day, "EEEE dd", { locale: es })}
                </th>
              ))}
            </tr>
            <tr>
              {days.map((day) => (
                <React.Fragment key={day.toString()}>
                  <th className="border px-2 py-1 text-center">Entrada</th>
                  <th className="border px-2 py-1 text-center">Salida</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="border px-4 py-2 font-medium">
                  {teacher.fullName}
                </td>
                {days.map((day) => {
                  const record = teacher.attendanceRecords.find(
                    (r) => r.date === format(day, "yyyy-MM-dd")
                  );
                  return (
                    <React.Fragment key={`${teacher.id}-${day.toString()}`}>
                      <td className="border px-2 py-1 text-center">
                        {formatTime(record?.checkIn)}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {formatTime(record?.checkOut)}
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
