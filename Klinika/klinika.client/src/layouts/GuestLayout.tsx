import {Fragment} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../../src/pages/Footer";

export default function GuestLayout() {
    return (
        <Fragment>
            <Navbar/>
            <main className="relative overflow-hidden">
                <Outlet/>
                {/* <Background /> */}
            </main>
            <Footer/>
        </Fragment>
    );
}
