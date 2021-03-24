import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import './ChatView.css';
import { selectSelectedImage } from './features/appSlice';

function ChatView() {
    const selectedImage= useSelector(selectSelectedImage);
    const history=useHistory();
    
    //to prevent from loading this page if no image is selected
    useEffect(()=>{
        if(!selectedImage){
            exit();
        }
    }, [selectedImage]);

    const exit= ()=>{
        history.replace('/chats'); 
    }
    return (
        <div className="chatView">
            <img src={selectedImage} onClick={exit}/> 
            {/* on clicking it will pop from the image */}
        </div>
    )
}

export default ChatView
