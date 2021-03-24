import { Avatar } from '@material-ui/core';
import { StopRounded } from '@material-ui/icons';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ReactTimeago from 'react-timeago';


import './Chat.css';
import { selectImage } from './features/appSlice';
import { db } from './firebase';
 
function Chat({ id, profilePic, username,
    timestamp, imageUrl, read }) {
        
        const dispatch= useDispatch();
        const history= useHistory();

        const open=()=>{
            if(!read){
                dispatch(selectImage(imageUrl)); //passing the imageUrl 
                db.collection("posts").doc(id).set({
                    read:true,
                },
                {merge:true} //if we don't use merge then it will delete everything and just put read=true i.e overwrite
                // by using merge it edits just the read datafield to true i.e edit
                );
                history.push('chats/view');
            }
            };
    return (
        <div onClick={open} className="chat">
            <Avatar className="chat__avatar" src={profilePic} />{/*renders from the passed props*/}
            <div className="chat__info">
                <h4>{username}</h4>
                <p>Tap to view -<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
                {/* ReactTimeago is used to calculate time since the object was sent  */}
            </div> 
            {!read && <StopRounded className="chat__readIcon" />}
        </div>
    )
}

export default Chat
