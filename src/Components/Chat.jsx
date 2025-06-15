import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { socketConnection } from '../utils/Socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Base_Url } from '../utils/Constant';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Chat = () => {
    const location = useLocation();
    const { target_id } = useParams();
    const [newmessages, setnewMessages] = useState("");
    const [messages, setMessage] = useState([]);
    // console.log(target_id);
    const user = useSelector((store) => store.user);
    const userID = user?._id;


    const connection = location.state?.connections;
    console.log(connection[0]?.firstName);

    // use to extend real time
    dayjs.extend(relativeTime);



    const fetchMessages = async () => {
        const chat = await axios.get(Base_Url + "/chat/" + target_id,
            { withCredentials: true, }
        );
        console.log(chat);
        const chatMessage = chat?.data?.message.map((msg) => {
            const { senderId, text, time } = msg;
            console.log(msg);

            return {
                firstName: senderId?.firstName,
                text: text,
                time,
            }
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
            firstName: user?.firstName,
            userID,
            target_id,
            text: newmessages
        });


        socket.on("messageReceived", ({ firstName, text }) => {
            console.log(firstName + " : " + text);

            setMessage((messages) => [...messages, { firstName: firstName, text, time: new Date().toISOString() }]);
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
            firstName: user?.firstName,
            userID,
            target_id,
            text: newmessages,
        });

        setnewMessages("");
    }

    const targetConnection = connection?.find(
        (user) => user._id === target_id
    );



    return (
        <>
            <div className="min-h-screen w-full bg-gradient-to-br from-[#a2c2e2] via-[#b5a7d7] to-[#f4a7c5] flex items-center justify-center">

                <div className="w-full max-w-5xl mx-auto border border-white/30  shadow-xl bg-white/20 backdrop-blur-lg h-screen sm:h-[95vh] md:h-[90vh] flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="relative border-b border-orange-300 p-3 bg-white/30 backdrop-blur-md">
                        <Link to="/connections" className="absolute left-3 top-1/2 -translate-y-1/2">
                            <img className="h-8 w-8" src="/back.png" alt="Back" />
                        </Link>
                        <h1 className="text-xl sm:text-2xl text-center font-semibold text-gray-800">{targetConnection?.firstName}, {targetConnection?.lastName}</h1>
                        {connection &&
                            <div className='flex justify-center'>
                                <div className='flex items-center gap-1'>
                                    <h6 className='text-sm font-semibold text-gray-800'>Online</h6>
                                    <img src="/online.png" className='h-3 w-3' />
                                </div>
                            </div>
                        }

                    </div>

                    {/* Chat Body */}
                    <div className="flex-1 bg-gradient-to-br from-orange-100 to-pink-100 overflow-y-auto px-3 sm:px-4 py-4 space-y-4 scroll-smooth">
                        {(messages || []).map((msg, index) => (
                            <div
                                key={index}
                                className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}
                            >
                                <div className="chat-header text-xs font-semibold text-gray-600">
                                    {msg.firstName}
                                    <time className="text-[10px] text-gray-500 ml-2 block">
                                        {dayjs(msg.createdAt).format("DD MM , hh:mm A" )}
                                    </time>
                                </div>
                                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg break-words p-3 rounded-2xl shadow-md bg-white text-sm text-gray-800">
                                    {msg.text}
                                </div>
                                <div className="chat-footer opacity-50 text-xs text-gray-500">Seen</div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 border-t border-gray-200 bg-white/70 backdrop-blur-sm flex items-center gap-2">
                        <input
                            value={newmessages}
                            onChange={(e) => setnewMessages(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                            placeholder="Type a message..."
                        />
                        <img
                            className="h-7 w-7 cursor-pointer hover:scale-110 transition-transform"
                            src="/message.png"
                            onClick={sendMessage}
                            alt="Send"
                        />
                    </div>

                </div>
            </div>
        </>

    )
}

export default Chat