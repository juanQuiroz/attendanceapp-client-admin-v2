"use client";

import React, { useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AttendanceRecord } from "@/types/attendance";
import { DateTimePickers } from "./date-time-picker";
import { format } from "@formkit/tempo";

function SheetEditAttendance({
  openSheet,
  setOpenSheet,
  attendanceData,
}: {
  openSheet: boolean;
  setOpenSheet: (open: boolean) => void;
  attendanceData?: AttendanceRecord[];
}) {
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar asistencia docente</SheetTitle>
          <p className="text-xl font-semibold text-gray-700">
            {attendanceData
              ? format(attendanceData[0]?.date || "", "long", "es-PE")
              : ""}
          </p>
        </SheetHeader>
        <div className="mt-16 mb-8">
          {attendanceData && attendanceData.length > 0
            ? attendanceData.map((attendance, index) => (
                <div
                  key={`${attendance.id}-${index}`}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 mb-6"
                >
                  <DateTimePickers
                    defaultDate={{
                      ...attendance,
                      checkin: attendance.checkin || "",
                      checkout: attendance.checkout || "",
                    }}
                    setOpenSheet={setOpenSheet}
                  />
                </div>
              ))
            : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SheetEditAttendance;
