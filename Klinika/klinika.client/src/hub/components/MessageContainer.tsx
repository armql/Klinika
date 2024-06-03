const MessageContainer = ({messages}) => {
    console.log(messages);
    return <div>
        {
            messages ? messages.map((msg, index) =>
                <table key={index}>
                    <tr>
                        <td>{msg.message} - {msg.user}</td>
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