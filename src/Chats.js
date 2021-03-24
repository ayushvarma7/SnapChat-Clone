import { Avatar } from '@material-ui/core';
import { ChatBubble, Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';

import './Chats.css';
import Chat from './Chat';


function Chats() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("posts")
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot) => //returns a snapshot of latest database
         setPosts(
             snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
            )
        );
    }, []);

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
                {posts.map(//ES6 destructuring
                    ({id, data: {profilePic, username,
                 timestamp, imageUrl, read}})=>(
                     <Chat
                         key={id}
                         id={id}
                         username={username}
                         timestamp={timestamp}
                         imageUrl={imageUrl}
                         read={read}
                         profilePic={profilePic}
                     />
                 ))}
            </div>
        </div>
    )
}

export default Chats;
