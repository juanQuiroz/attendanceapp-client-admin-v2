"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FooterSidebar } from "./footer-sidebar";
import { usePathname } from "next/navigation";
import { urbanist } from "@/app/fonts";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import SelectCycle from "./select-cycle";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "ph:chart-line",
  },
  {
    title: "Asistencia",
    url: "/attendance",
    icon: "ph:list-checks",
  },
  {
    title: "Estudiantes",
    url: "#",
    icon: "ph:users-four",
  },
  {
    title: "Docentes",
    url: "/teachers",
    icon: "ph:users-three",
  },
  {
    title: "Administrativos",
    url: "#",
    icon: "ph:users",
  },
  {
    title: "Aulas",
    url: "#",
    icon: "ph:door",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="flex flex-col items-center">
        <h1 className="text-md font-semibold mt-2 text-center">
          Universidad Nacional de Cañete
        </h1>
        <h1
          className={`text-2xl font-normal text-center -mt-2 text-blue-600 ${urbanist.className}`}
        >
          AttendanceApp
        </h1>
        {/* <Image
          src="/logo-cepre-blue.png"
          alt="Logo"
          width={180}
          height={100}
          className="mx-auto mt-4"
        /> */}
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-center items-center mx-3">
        <SelectCycle />
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.url)}
                className="px-3 py-5 ring-transparent focus-visible:ring-transparent"
              >
                <Link href={item.url}>
                  <Icon icon={item.icon} width={36} />
                  <span className="text-base">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <FooterSidebar />
    </Sidebar>
  );
}
