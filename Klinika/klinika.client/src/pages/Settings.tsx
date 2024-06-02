import {CaretRight} from "@phosphor-icons/react";
import {useState} from "react";
import {Contact, PersonalInfo, Preferences, Tos} from "../features/settings/__settings.ts";

const settings = [
    {
        id: 1,
        title: "Personal info",
        component: PersonalInfo,
    },
    {
        id: 2,
        title: "Preferences",
        component: Preferences,
    },
    {
        id: 3,
        title: "Contact & Support",
        component: Contact,
    },
    {
        id: 4,
        title: "Terms & Conditions",
        component: Tos,
    },
]

export default function Settings() {
    const [currentTab, setCurrentTab] = useState(1);
    return (
        <section className="flex flex-row w-full h-full">
            <div className="w-[350px] h-full bg-zinc-100 border-r-2">
                <ul className="flex flex-col items-start justify-center">
                    {settings.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentTab(item.id)}
                            className={`py-4 flex justify-between items-center font-medium w-full px-4 ${currentTab === item.id ? "bg-white text-zinc-800" : "text-zinc-600 bg-zinc-50 hover:bg-white"}`}>

                            {item.title}
                            <CaretRight
                                size={18}
                                weight="bold"
                                className={`transition-all duration-500 ${currentTab === item.id ? "" : "text-zinc-400 rotate-90"}`}/>
                        </button>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col w-full h-full p-6">
                {settings.filter((item) => item.id === currentTab).map((item) => (
                    <item.component key={item.id}/>
                ))}
            </div>
        </section>
    );
}

