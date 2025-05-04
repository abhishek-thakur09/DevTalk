import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { socketConnection } from '../utils/Socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Base_Url } from '../utils/Constant';

const Chat = () => {

    const { target_id } = useParams();
    const [newmessages, setnewMessages] = useState("");
    const [messages, setMessage] = useState([]);
    console.log(target_id);
    const user = useSelector((store) => store.user);
    const userID = user?._id;


    const fetchMessages = async () => {
        const chat = await axios.get(Base_Url + "/chat/" + target_id,
            { withCredentials: true, }
        );
        console.log(chat);
        const chatMessage = chat?.data?.message.map((msg) => {
            return { 
                firstName: msg?.senderId.firstName, 
                text: msg?.text }
        });
        setMessage(chatMessage);
    };

    useEffect(() => {
        fetchMessages();
    }, []);






    useEffect(() => {

        if (!userID) {
            return;
        }

        const socket = socketConnection();
        // As soon as pageLoaded , the socket connection is made and join chat event is emitted
        socket.emit("joinChat", {
            Name: user?.firstName,
            userID,
            target_id,
            text: newmessages
        });


        socket.on("messageReceived", ({ Name, text }) => {
            console.log(Name + " : " + text);

            setMessage((messages) => [...messages, { Name, text }])
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
            Name: user?.firstName,
            userID,
            target_id,
            text: newmessages
        });

        setnewMessages("");
    }




    return (

        <div className="min-h-screen w-[100%] p-4 sm:p-8 md:p-10 bg-gradient-to-br from-[#a2c2e2] via-[#b5a7d7] to-[#f4a7c5] flex items-center justify-center">

            <div className='w-3/4 sm:w-[80%] md:w-3/4 lg:w-3/6 mx-auto border border-white/30 rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg h-[85vh] flex flex-col overflow-hidden'>

                <div className="relative border-b border-orange-300 p-3 backdrop-blur-md bg-white/30">
                    {/* Back Button */}
                    <Link to="/connections" className="absolute left-3 top-1/2 -translate-y-1/2">
                        <img className="h-8 w-8" src="/back.png" alt="Back" />
                    </Link>

                    {/* Title Centered */}
                    <h1 className="text-2xl text-center">Chat</h1>
                </div>
                <div className='flex-1 bg-gradient-to-br from-orange-100 to-pink-100 overflow-y-auto p-4 space-y-4'>{/*Display message*/}
                    {(messages || []).map((msg, index) => {
                        return (
                            <div key={index} className={"chat "+ 
                                (user.firstName == msg.firstName ? "chat-end":"chat-start")
                            }>
                                <div className="chat-header">
                                    {`${msg?.firstName}`}
                                    <time className="text-[10px] text-gray-500 float-right mt-1 block">2 hours ago</time>
                                </div>
                                <div
                                    className="max-w-[100%] p-3 rounded-2xl shadow-md text-sm">{msg.text}</div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                        )
                    })}
                </div>
                <div className='p-3 border-t border-gray-200 bg-white/70 backdrop-blur-sm flex gap-2'>
                    <input
                        value={newmessages}
                        onChange={(e) => { setnewMessages(e.target.value) }}
                        className='flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm'></input>
                    <img className='h-7 w-7 cursor-pointer hover:scale-110 transition-transform' src="/message.png" onClick={sendMessage}></img>
                </div>

            </div>
        </div>
    )
}

export default Chat