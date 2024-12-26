import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ClientTable from "./components/client-table";
import DashboardHeader from "./components/dashboard-header";
import { SearchInputProvider } from "@/context/SearchInputProvider";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("auth")?.value === "true";

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="container w-full p-4 h-full max-w-full sm:max-w-none">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Panel</h1>
      <SearchInputProvider>
        <DashboardHeader />
        <ClientTable />
      </SearchInputProvider>
    </div>
  );
}
