import {Fragment} from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

export default function PatientLayout() {
    return (
        <Fragment>
            <QueryClientProvider client={queryClient}>

                <Sidebar user="patient">
                    <main className="relative overflow-hidden">
                        <Outlet/>
                    </main>
                </Sidebar>
                {/* TODO: Footer */}
            </QueryClientProvider>
        </Fragment>
    );
}
