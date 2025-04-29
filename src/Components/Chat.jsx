import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { socketConnection } from '../utils/Socket';
import { useSelector } from 'react-redux';

const Chat = () => {

    const { target_id } = useParams();
    const [newmessages, setnewMessages] = useState("");
    const [messages, setMessage] = useState([]);
    console.log(target_id);

    const user = useSelector((store) => store.user);
    const userID = user?._id;
   
    useEffect(() => {

        if(!userID){
            return;
        }

        const socket = socketConnection();
        // As soon as pageLoaded , the socket connection is made and join chat event is emitted
        socket.emit("joinChat", {
             Name: user?.firstName,
             userID,
             target_id ,
             text:newmessages});


        socket.on("messageReceived", ({ Name, text })=>{
                console.log(Name + " : "+ text);

                setMessage((messages)=> [...messages, {Name, text}])
             })


        // for disconnect
        return () => {
            socket.disconnect();
        };
    }, [user, target_id]);

    console.log(newmessages);
    


    const sendMessage = () => {
        const server = socketConnection();

        server.emit("sendmessage", {
            Name: user?.firstName ,
            userID,
            target_id,
            text:newmessages
        });

        setnewMessages("");
    }




    return (
        <div className='w-1/2 mx-auto border-2 border-gray-400 n-5 h-[70vh] flex flex-col '>
            <h1 className='p-2 border-b border-orange-300 text-center text-2xl'>Chat</h1>
            <div className='flex-1 bg-orange-100 overflow-scroll p-5'>{/*Display message*/}
                {(messages || []).map((msg, index) => {
                    return (
                            <div key={index} className="chat chat-start">
                                <div className="chat-header">
                                    {msg?.Name}
                                    <time className="text-xs opacity-50">2 hours ago</time>
                                </div>
                                <div
                                    className="chat-bubble">{msg.text}</div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                    )
                })}
            </div>
            <div className='p-2 border-t flex'>
                <input
                    value={newmessages}
                    onChange={(e) => { setnewMessages(e.target.value) }}
                    className='w-full h-full border-pointer rounded bg-orange-200'></input>
                <img className='h-7 cursor-pointer mx-2' src="/message.png" onClick={sendMessage}></img>
            </div>

        </div>
    )
}

export default Chat