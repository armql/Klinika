import {useState} from "react";

type SendMessageFormProps = {
    sendMessage: (message: string) => void;
};

const SendMessageForm = ({sendMessage}: SendMessageFormProps) => {
    const [msg, setMessage] = useState('');
    return (
        <div className="w-full flex justify-end items-center">
            <div
                className="flex flex-col overflow-hidden border-2 rounded-full items-center justify-center min-w-[200px] w-[620px] h-12">
                <form onSubmit={e => {
                    e.preventDefault();
                    sendMessage(msg);
                    setMessage('');
                }} className="w-full px-1">
                    <div className="w-full h-full relative py-1 flex justify-between items-center">
                        <input placeholder="Message"
                               className="appearance-none text-sm w-full focus:outline-none px-4 py-1"
                               onChange={e => setMessage(e.target.value)}
                               value={msg}/>
                        <button type="submit" disabled={!msg}
                                className="border-2 py-0.5 px-4 h-full rounded-full border-b-4 hover:bg-zinc-50 transition-all duration-300 active:border-b-2">Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SendMessageForm;