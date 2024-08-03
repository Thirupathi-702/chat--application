import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';

const socket = io('https://chat-application-uewj.onrender.com');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);

        if (storedUsername) {
            socket.emit('join', storedUsername);
        }

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on('userList', (userList) => {
            setUsers(userList);
        });

        return () => {
            socket.off('message');
            socket.off('userList');
        };
    }, []);

    const sendMessage = (text) => {
        const token = localStorage.getItem('token');
        socket.emit('chatMessage', { text, token });
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        socket.emit('logout');
        window.location.href = "/";
    };

    return (
        <div className="chat-container">
            <UserList users={users} loggedInUser={username} handleLogout={handleLogout} />
            <div className="chat-window">
                <MessageList messages={messages} />
                <MessageInput sendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default Chat;
