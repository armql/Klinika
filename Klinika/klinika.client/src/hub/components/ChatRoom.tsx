﻿import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm.tsx";
import {Message} from "../../pages/Hub.tsx";

type ChatRoomProps = {
    messages: Message[];
    sendMessage: (message: string) => void;
    leaveConn: () => void;
};

const ChatRoom = ({messages, sendMessage, leaveConn}: ChatRoomProps) => <div>
    <div className={"px-5 my-5 flex flex-row h-full"}>
        <div className="flex flex-row w-full items-center justify-between">
            <h2 className={"font-weight-light"}>ChatRoom</h2>
            <button
                type="button"
                onClick={leaveConn}
                className="border-2 text-black hover:bg-black hover:text-white px-3 py-1 rounded-md"
            >
                Leave chatroom
            </button>
        </div>
    </div>
    <div className="px-5 py-5 flex flex-col justify-between gap-2 border-t-2 border-b-2 my-4">
        <MessageContainer messages={messages}/>
    </div>
    <SendMessageForm sendMessage={sendMessage}/>
</div>

export default ChatRoom;