import {useState} from 'react';
import {HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel} from "@microsoft/signalr";
import {Col, Container, Row} from "react-bootstrap";
import WaitingRoom from "../hub/components/waitingRoom.tsx";
import ChatRoom from "../hub/components/ChatRoom.tsx";

export type Message = {
    user: string;
    profileImage: string;
    message: string;
};


export default function Hub() {
    const [conn, setConnection] = useState<HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const joinChatRoom = async (username: string, profileImage: string, chatroom: string) => {
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
                signalConnection.on("RecieveSpecificMessage", (user, profileImage, message) => {
                    setMessages(messages => [...messages, {user, profileImage, message}]);
                });
                signalConnection.on("RecieveMessage", (user, profileImage, message) => {
                    setMessages(messages => [...messages, {user, profileImage, message}]);
                });

                setConnection(signalConnection);
                if (signalConnection.state === HubConnectionState.Connected) {
                    signalConnection.invoke("JoinSpecificChatRoom", {
                        userName: username,
                        profileImage: profileImage,
                        chatRoom: chatroom
                    });
                }
            })
            .catch(err => console.error('Connection failed: ', err));

        return () => {
            signalConnection.off("RecieveSpecificMessage");
            signalConnection.off("RecieveMessage");
            signalConnection.stop();
        };
    };

    const sendMessage = async (message: string) => {
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
                : <ChatRoom messages={messages} sendMessage={sendMessage} leaveConn={() => setConnection(null)}/>
            }
        </Container>
    );
};

