import {useEffect, useRef} from 'react';
import {zPersonal} from "../../settings/__settings.ts";
import {User} from "@phosphor-icons/react";

interface Message {
    user: string;
    message: string;
    profileImage?: string;
}

interface MessageContainerProps {
    messages: Message[];
}

const MessageContainer = ({messages}: MessageContainerProps) => {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const {data: AccountData} = zPersonal();
    const currentUsername = AccountData?.firstName + ' ' + AccountData?.lastName;

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    return <div
        className="flex flex-col gap-4 items-end max-h-[400px] h-[400px] p-4 scrollbar-hide overflow-y-auto">
        {
            messages ? messages.map((msg, index) =>
                <div key={index} className="flex flex-row items-end gap-1">
                    <div
                        className={`flex justify-end items-end flex-col p-2 rounded-md ${msg.user === currentUsername ? 'bg-emerald-100' : 'bg-zinc-100'}`}>
                        <div className="flex flex-row items-start">
                            <h3 className={` text-xs ${msg.user === currentUsername ? 'text-emerald-700' : 'text-zinc-400'}`}>
                                {msg.user}
                            </h3>
                        </div>
                        <p className="text-sm">
                            {msg.message}
                        </p>
                    </div>
                    <div
                        className="w-9 h-9 rounded-full overflow-hidden border-2 flex justify-center items-center">
                        {msg.profileImage ? (<img src={msg.profileImage} alt="Profile"
                                                  className="w-full h-full object-cover"/>) : (
                            <User size={20} weight="duotone"/>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <h2>No Messages</h2>
                </div>
            )
        }
        <div ref={messagesEndRef}/>
    </div>;
}

export default MessageContainer;