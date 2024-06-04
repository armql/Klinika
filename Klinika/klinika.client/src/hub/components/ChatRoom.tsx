import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm.tsx";

const ChatRoom = ({messages, sendMessage}) => <div>
    <div className={"px-5 my-5 flex flex-row border-blue-400 border-2"}>
        <div className="flex flex-col border-2">
            <h2 className={"font-weight-light"}>ChatRoom</h2>
        </div>
    </div>
    <div className="px-5 py-5 flex flex-col gap-2 border-2 border-red-400">
        <MessageContainer messages={messages}/>
        <div className="flex flex-col border-2 rounded-full items-center justify-center w-80">
            <SendMessageForm sendMessage={sendMessage}/>
        </div>
    </div>
</div>

export default ChatRoom;