"use client";

import { useTeachers } from "@/hooks/queries/use-teachers";
import HeaderSection from "@/components/layout/header-section";

export default function TeachersPage() {
  const { data } = useTeachers();
  console.log("🚀 ~ TeachersPage ~ data:", data);

  return (
    <div className="flex items-center gap-3 text-slate-800">
      <HeaderSection title="Docentes" iconName="ph:users-three" />
    </div>
  );
}
