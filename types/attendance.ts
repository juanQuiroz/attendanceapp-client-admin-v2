export type AttendanceRecord = {
  id: string;
  date: string; // "2025-06-01"
  checkin: string | null;
  checkout: string | null;
};

export type TeacherWithAttendance = {
  id: string;
  fullName: string;
  attendanceRecords: AttendanceRecord[];
};

export type AttendanceTeacherResponse = {
  statusCode: number;
  message: string;
  userMessage: string;
  data: TeacherWithAttendance[];
  meta: {
    total: number;
  };
};

export type AttendanceTimes = {
  checkin: string | null;
  checkout: string | null;
};
