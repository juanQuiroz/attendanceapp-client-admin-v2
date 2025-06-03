import { redirect } from "next/navigation";

function AttendancePage() {
  redirect("/attendance/students");
  return null;
}

export default AttendancePage;
