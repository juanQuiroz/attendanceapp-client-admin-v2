import { redirect } from "next/navigation";

export default function Home() {
  redirect("/attendance/teachers");
  return null;
}
