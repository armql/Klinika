import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

export default function AdministrationLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Sidebar user="administration">
                <main className="relative overflow-hidden">
                    <Outlet/>
                </main>
            </Sidebar>
        </QueryClientProvider>
    );
}
