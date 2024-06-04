import {useState} from "react";


const SendMessageForm = ({sendMessage}) => {
    const [msg, setMessage] = useState('');

    return <form onSubmit={e => {
        e.preventDefault();
        sendMessage(msg);
        setMessage('');
    }}>
        <div className="w-full h-full relative flex justify-between">
            <input placeholder="Message" className="w-full h-full border-2" onChange={e => setMessage(e.target.value)}
                   value={msg}/>
            <button type="submit" disabled={!msg} className="border-2 px-4 h-full rounded-full">Send</button>
        </div>
    </form>
}

export default SendMessageForm;