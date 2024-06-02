import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

export default function SpecializedDoctorLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Sidebar user="spec">
                <main className="relative overflow-hidden">
                    <Outlet/>
                </main>
            </Sidebar>
            {/* TODO: Footer */}
        </QueryClientProvider>
    );
}
