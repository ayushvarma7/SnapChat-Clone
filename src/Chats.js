import { Avatar } from '@material-ui/core';
import { ChatBubble, Search } from '@material-ui/icons';
import React from 'react'

import './Chats.css';
function Chats() {
    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar className='chats__avatar' />
                <div className="chats__search">
                    <Search />
                    <input placeholder="Friends" type="text" />
                </div>
                <ChatBubble />
            </div>
            <div className="chats__posts">
                 
            </div>
        </div>
    )
}

export default Chats;
