import {useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import {zPersonal} from "../../features/settings/__settings.ts";
import ReactSelect from "react-select";

const waitingRooms = [
    {
        value: 'public/guest',
        label: 'Public Chatroom'
    },
    {
        value: 'global',
        label: 'Global Chatroom'
    },
    {
        value: 'support',
        label: 'Support Chatroom'
    }
]

const WaitingRoom = ({joinChatRoom}) => {
    const {data: AccountData} = zPersonal();
    const [chatroom, setChatroom] = useState('');
    const [username, setUsername] = useState(AccountData?.firstName + ' ' + AccountData?.lastName);
    const [image, setImage] = useState(AccountData?.image);
    const handleChatroomChange = (selectedOption) => {
        setChatroom(selectedOption.value);
    };

    return <Form onSubmit={e => {
        e.preventDefault();
        joinChatRoom(username, image, chatroom);
    }}>
        <Row className={"px-5 py-5"}>
            <Col sm={12}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={username}/>
                    <Form.Label>Chatroom</Form.Label>
                    <ReactSelect
                        name="chatroom"
                        options={waitingRooms}
                        onChange={handleChatroomChange}
                    />
                </Form.Group>
            </Col>
            <Col sm={12}>
                <hr/>
                <Button variant={"success"} type='submit'>Join Chatroom</Button>
            </Col>
        </Row>
    </Form>
}

export default WaitingRoom;