const MessageContainer = ({messages}) => {
    return <div className="flex flex-col gap-4 items-end">
        {
            messages ? messages.map((msg, index) =>
                <table key={index}>
                    <tr>
                        <td className="flex flex-row items-end gap-1">
                            <div className="flex justify-end items-end flex-col bg-zinc-100 p-2 rounded-md">
                                <div className="flex flex-row items-start">
                                    <h3 className="text-zinc-400 text-xs">
                                        {msg.user}
                                    </h3>
                                </div>
                                <p className="text-sm">
                                    {msg.message}
                                </p>
                            </div>
                            <div className="w-9 h-9 rounded-full overflow-hidden">
                                <img src={msg.profileImage} alt="Profile"
                                     className="w-full h-full object-cover"/>
                            </div>
                        </td>
                    </tr>
                </table>) : (
                <div>
                    <h2>No Messages</h2>
                </div>
            )
        }
    </div>;
}

export default MessageContainer;