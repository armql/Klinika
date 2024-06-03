import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

export default function PrimaryDoctorLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Sidebar user="primary">
                <main className="relative overflow-hidden">
                    <Outlet/>
                </main>
            </Sidebar>
        </QueryClientProvider>
    );
}
