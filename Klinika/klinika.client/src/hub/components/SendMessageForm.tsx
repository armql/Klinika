import {Button, Form, InputGroup} from "react-bootstrap";
import {useState} from "react";


const SendMessageForm = ({sendMessage}) => {
    const [msg, setMessage] = useState('');

    return <Form onSubmit={e => {
        e.preventDefault();
        sendMessage(msg);
        setMessage('');
    }}>
        <InputGroup className="mb-3">
            <InputGroup.Text>Chat</InputGroup.Text>
            <Form.Control placeholder="Message" onChange={e => setMessage(e.target.value)} value={msg}/>
            <Button variant="primary" type="submit" disabled={!msg}>Send</Button>
        </InputGroup>
    </Form>
}

export default SendMessageForm;