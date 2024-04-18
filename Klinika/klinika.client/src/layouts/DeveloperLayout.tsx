import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function DeveloperLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar user="dev">
        <main className="relative overflow-hidden">
          <Outlet />
        </main>
      </Sidebar>
      {/* TODO: Footer */}
    </QueryClientProvider>
  );
}
