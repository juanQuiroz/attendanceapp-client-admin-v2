"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { attendanceTeachersService } from "@/lib/api/services/attendance.service";
import { useUpdateAttendanceTeacher } from "@/hooks/queries/use-attendance";

export const DateTimePickers = ({
  defaultDate,
  setOpenSheet,
  onChange,
}: {
  defaultDate: {
    checkin: string;
    checkout: string;
    id: string;
    date: string;
  };
  setOpenSheet: (open: boolean) => void;
  onChange?: (times: { checkin: string; checkout: string }) => void;
}) => {
  const [attendanceDates, setAttendanceDates] = React.useState({
    checkin: defaultDate.checkin || "",
    checkout: defaultDate.checkout || "",
  });
  const { mutate: updateAttendanceTeacher } = useUpdateAttendanceTeacher();

  React.useEffect(() => {
    setAttendanceDates({
      checkin: defaultDate.checkin || "",
      checkout: defaultDate.checkout || "",
    });
  }, [defaultDate]);

  const getTimeString = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "checkin" | "checkout"
  ) => {
    const [hours, minutes, seconds] = e.target.value.split(":");
    const prevDate = new Date(attendanceDates[type] || new Date());
    prevDate.setHours(Number(hours));
    prevDate.setMinutes(Number(minutes));
    prevDate.setSeconds(Number(seconds) || 0);
    setAttendanceDates((prev) => ({
      ...prev,
      [type]: prevDate.toISOString(),
    }));
    onChange?.({
      ...attendanceDates,
      [type]: prevDate.toISOString(),
    });
  };

  async function onSubmit() {
    await updateAttendanceTeacher({
      attendanceId: defaultDate.id,
      attendanceTimes: attendanceDates,
    });
    setOpenSheet(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="checkin-time-picker" className="px-1">
            Ingreso
          </Label>
          <Input
            type="time"
            id="checkin-time-picker"
            step="1"
            value={getTimeString(attendanceDates.checkin)}
            onChange={(e) => handleTimeChange(e, "checkin")}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="checkout-time-picker" className="px-1">
            Salida
          </Label>
          <Input
            type="time"
            id="checkout-time-picker"
            step="1"
            value={getTimeString(attendanceDates.checkout)}
            onChange={(e) => handleTimeChange(e, "checkout")}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-end gap-4 mt-4">
        <Button variant="outline" onClick={() => setOpenSheet(false)}>
          Cancelar
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-500"
          type="submit"
          onClick={() => onSubmit()}
        >
          Actualizar
        </Button>
      </div>
    </div>
  );
};
