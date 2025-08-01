import { AttendanceTeacherResponse, AttendanceTimes } from "@/types/attendance";
import { apiClient } from "../client";

export const attendanceTeachersService = {
  getAllAttendancesByCycleGroupedByTeachers: async (cycleId: string) => {
    const response = await apiClient.get<AttendanceTeacherResponse>(
      `attendance-records-teachers/sumary/by-cycle/${cycleId}`
    );
    return response.data;
  },

  updateTimeAttendance: async (
    attendanceId: string,
    attendanceTimes: AttendanceTimes
  ) => {
    const response = await apiClient.patch<AttendanceTeacherResponse>(
      `attendance-records-teachers/${attendanceId}`,
      attendanceTimes
    );

    return response.data;
  },
};
