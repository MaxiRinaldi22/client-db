import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        <DashboardSidebar />
        <main className="flex-1 w-full h-full flex overflow-y-auto p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
