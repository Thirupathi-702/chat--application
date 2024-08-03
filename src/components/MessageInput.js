import React, { useState } from 'react';

const MessageInput = ({ sendMessage }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="message-input">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                required
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageInput;
