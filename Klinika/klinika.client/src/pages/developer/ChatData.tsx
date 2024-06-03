import {useState} from 'react';
import {HttpTransportType, HubConnectionBuilder, HubConnectionState, LogLevel} from "@microsoft/signalr";
import {Col, Container, Row} from "react-bootstrap";
import WaitingRoom from "../../hub/components/waitingRoom.tsx";
import ChatRoom from "../../hub/components/ChatRoom";

const App = () => {
    const [conn, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [chatroom, setChatroom] = useState('');

    const joinChatRoom = async (username, chatroom) => {
        setUsername(username);
        setChatroom(chatroom);

        const signalConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7045/chatHub", {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        signalConnection.start()
            .then(() => {
                signalConnection.on("RecieveSpecificMessage", (user, message) => {
                    setMessages(messages => [...messages, {user, message}]);
                });
                signalConnection.on("RecieveMessage", (user, message) => {
                    setMessages(messages => [...messages, {user, message}]);
                });
                
                setConnection(signalConnection);
                if (signalConnection.state === HubConnectionState.Connected) {
                    signalConnection.invoke("JoinSpecificChatRoom", {userName: username, chatRoom: chatroom});
                }
            })
            .catch(err => console.error('Connection failed: ', err));

        return () => {
            signalConnection.off("RecieveSpecificMessage");
            signalConnection.off("RecieveMessage");
            signalConnection.stop();
        };
    };

    const sendMessage = async (message) => {
        if (conn && conn.state === HubConnectionState.Connected) {
            await conn.invoke("SendMessage", message);
        }
    };

    return (
        <Container>
            <Row className={"px-5 my-5"}>
                <Col sm={"12"}>
                    <h1 className={"font-weight-light"}>Welcome to the ChatApp</h1>
                </Col>
            </Row>
            {!conn
                ? <WaitingRoom joinChatRoom={joinChatRoom}/>
                : <ChatRoom messages={messages} sendMessage={sendMessage}/>
            }
        </Container>
    );
};

export default App;