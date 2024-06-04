import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {zAuth} from "../store/zAuth.ts";
import {zPersonal} from "../features/settings/store/zPersonal.ts";
import {ApiService} from "../services/ApiServices.ts";
import {Account} from "../features/settings/components/PersonalInfo.tsx";
import axios_instance from "../api/axios.ts";
import {useQuery} from "react-query";


export default function SpecializedDoctorLayout() {
    const {data: userData} = zAuth();
    const {setData: setAccountData} = zPersonal();
    const current_api = new ApiService<Account>(
        {
            get: 'Account/get',
        },
        axios_instance
    );

    const fetchAccountData = async (id: string) => {
        const response = await current_api.get(id);
        return response;
    }

    const {isLoading, data} = useQuery(['accountData', userData.id], () => fetchAccountData(userData.id), {
        onSuccess: (data) => {
            const accountData = {
                id: data.id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                profileImage: data.profileImage,
                image: data.image,
            };
            console.log(accountData);
            setAccountData(accountData);
        },
    });

    if (isLoading) {
        return <div className="bg-white w-full h-full"/>;
    }
    
    return (
        <Sidebar user="spec">
            <main className="relative overflow-hidden">
                <Outlet/>
            </main>
        </Sidebar>
    );
}
