import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

type AttendanceTeacherState = {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  resetDateRange: () => void;
};

export const useAttendanceTeacherStore = create<AttendanceTeacherState>(
  (set) => ({
    dateRange: { from: new Date(), to: addDays(new Date(), 2) },
    setDateRange: (range) => set({ dateRange: range }),
    resetDateRange: () =>
      set({ dateRange: { from: new Date(), to: addDays(new Date(), 2) } }),
  })
);
