import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

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

            <div className="chatView__timer">
            <CountdownCircleTimer 
            isPlaying 
            duration={10} 
            strokeWidth={6} 
            size={50}
            colors={[
                ["#004777", 0.33],
                ["#F7B801", 0.33],
                ["#A30000", 0.33],
            ]}
            >
            {({remainingTime})=>{
                if(remainingTime === 0) { //timer reaches 0, pop out from the snap
                    exit();
                }
                return remainingTime;
            }}
            </CountdownCircleTimer>
            </div>
           
        </div>
    )
}

export default ChatView
