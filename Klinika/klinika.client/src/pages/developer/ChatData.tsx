import {Col, Container, Row} from "react-bootstrap";
import WaitingRoom from "../../hub/components/waitingRoom.tsx";
import {useState} from 'react';
import {HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "../../hub/components/ChatRoom";
import {ConsoleLogger} from "@microsoft/signalr/dist/esm/Utils";


const App = () => {
        const [conn, setConnection] = useState();
        const[messages, setMessages] = useState();
        const signalConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:7045/chatHub")
            .configureLogging(LogLevel.Information)
            .build();
        
        const joinChatRoom = async (userName, chatRoom) => {
            try {
                

                signalConnection.on("JoinSpecificChatRoom", (userName, msg) => {
                    console.log("msg: ", msg);
                });
                
                signalConnection.on("RecieveSpecificMessage", (userName, msg) => {
                    setMessages(messages => [...messages, {userName, msg}] );
                });

                await signalConnection.start();
                await signalConnection.invoke("JoinChatRoom", {userName, chatRoom});

                setConnection(signalConnection);
            } catch (e) {
                console.log(e);
            }
        };
        
        const sendMessage = async(message) => {
            try {
                await signalConnection.invoke("SendMessage", message);
            } catch (e) {
                console.log(e);
            }
        }
    
    return (
        <Container>
            <Row className={"px-5 my-5"}>
                <Col sm={"12"}>
                    <h1 className={"font-weight-light"}>Welcome to the ChatApp</h1>
                </Col>
            </Row>
            { !conn
                ? <WaitingRoom joinChatRoom={joinChatRoom}/>
                : <ChatRoom messages={messages} sendMessage={sendMessage}/>
            }
            
        </Container>
    );
};

export default App;