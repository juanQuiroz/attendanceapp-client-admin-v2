import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-gradient-to-br from-slate-100 via-blue-50 to-slate-50">
      <AppSidebar />
      <main className="p-5 w-full">{children}</main>
      <Toaster />
    </SidebarProvider>
  );
}
