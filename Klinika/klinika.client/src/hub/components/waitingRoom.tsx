import {useState} from "react";
import {Button} from "react-bootstrap";
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
type JoinChatRoom = (username: string, profileImage: string, chatroom: string) => void;

type WaitingRoomProps = {
    joinChatRoom: JoinChatRoom;
};

type SelectedOption = {
    value: string;
    label: string;
}

const WaitingRoom = ({joinChatRoom}: WaitingRoomProps) => {
    const {data: AccountData} = zPersonal();
    const [chatroom, setChatroom] = useState('');
    const [username] = useState(AccountData?.firstName + ' ' + AccountData?.lastName);
    const [image] = useState(AccountData?.image || '');
    const handleChatroomChange = (selectedOption: SelectedOption) => {
        setChatroom(selectedOption.value);
    };

    return <Form onSubmit={e => {
        e.preventDefault();
        joinChatRoom(username, image, chatroom);
    }}>
        <div className={"mt-6 border-2 w-fit rounded-xl bg-zinc-50 p-12"}>
            <div className="">
                <div className="flex flex-row gap-2 items-center justify-start">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-medium text-xl">
                            Chatroom Form
                        </h3>
                        <div className="flex flex-col">
                            <label className="text-zinc-400 text-sm">Username</label>
                            <Form.Control plaintext readOnly defaultValue={username}
                                          className="text-lg px-2 rounded-md py-0.5 border border-zinc-300"/>
                        </div>
                        <div className="w-60">
                            <label className="text-zinc-400 text-sm">Select a Chatroom</label>
                            <ReactSelect
                                name="chatroom"
                                options={waitingRooms}
                                onChange={handleChatroomChange}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: 'neutral',
                                        primary: 'black',
                                    },
                                })}
                            />
                        </div>
                        <div className="px-4 mt-2 py-1.5 w-fit rounded-md bg-zinc-800 text-white">
                            <Button variant={"success"} type='submit'>Join Chatroom</Button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </Form>
}

export default WaitingRoom;