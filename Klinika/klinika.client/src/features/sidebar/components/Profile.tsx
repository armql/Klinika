import {useNavigate} from "react-router-dom";
import axios_instance from "../../../services/axios.ts";
import {SignOut, User} from "@phosphor-icons/react";
import {UserData, zAuth} from "../../../store/zAuth";
import {zPersonal} from "../../settings/__settings.ts";
import {zNavigation} from "../../navigation/__navigation.ts";

type Props = {
    effect: boolean;
};

export default function Profile({effect}: Props) {
    const navigate = useNavigate();
    const {setData} = zAuth();
    const {data: accountData, setData: setAccountData} = zPersonal();

    const {deselectFavoritenRecents} = zNavigation();

    function logout() {
        try {
            axios_instance.get("/api/Auth/logout").then(() => {
                setData({
                    email: "",
                    id: "",
                    jwtid: "",
                    role: "GUEST",
                    exp: 0,
                    iss: "",
                    aud: "",
                } as UserData);
                setAccountData(null);
                deselectFavoritenRecents();
                navigate("/login");
            });
        } catch (error) {
            console.log(error);
        }
    }

    const profileImage = accountData?.image || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106'; // Replace with the URL of the default image

    return (
        <div
            className={`flex justify-between w-full gap-2 px-2 ${
                effect ? "flex-col" : "flex-row"
            }`}
        >
            <div className="flex items-center justify-center gap-2 flex-row">
                <div
                    className="h-9 w-9 overflow-hidden flex border justify-center items-center rounded-full bg-zinc-50"
                >
                    {accountData?.image ? (
                        <img src={profileImage} alt="profile" className="h-full rounded-full object-cover w-full"/>
                    ) : (
                        <User size={32} className="text-zinc-600"/>
                    )}
                </div>
                {!effect && <span className="tracking-wide">{accountData?.firstName} {accountData?.lastName}</span>}
            </div>

            <div className="rounded-lg bg-gray-100">
                <button
                    title="Logout button"
                    type="button"
                    onClick={() => logout()}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border border-transparent bg-white py-1.5 transition duration-300 hover:-translate-x-1 px-2 hover:border-gray-200 active:-translate-x-1.5 active:shadow-sm ${
                        effect && "w-full"
                    }`}
                >
                    <SignOut size={24}/>
                </button>
            </div>
        </div>
    );
}