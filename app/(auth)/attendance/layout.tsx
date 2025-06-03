import HeaderSection from "@/components/layout/header-section";

const tabs = [
  {
    title: "Estudiantes",
    url: "/attendance/students",
  },
  {
    title: "Docentes",
    url: "/attendance/teachers",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderSection title="Asistencia" iconName="ph:list-checks" tabs={tabs} />
      {children}
    </>
  );
}
