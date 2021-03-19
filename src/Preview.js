import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import './Preview.css';
import { AttachFile, Close, Create, Crop, MusicNote, Note, Send, TextFields, Timer } from '@material-ui/icons';

function Preview() {
    const cameraImage= useSelector(selectCameraImage);
    //calling the camImage fn which stores the SS in cameraImage
    const history= useHistory(); 
    const dispatch = useDispatch();
    
    useEffect(()=>{
    if(!cameraImage){ //if no image captured
        history.replace('/'); //routes back to / path
    }
    }, [cameraImage, history]); //dependent on cameraImage, history

    const closePreview=()=>{
        dispatch(resetCameraImage());
    }

    const sendPost= ()=>{
        
    }
    return (
        <div className="preview">
            <Close onClick={closePreview}
            className="preview__close"/>
            <div className="preview__toolbarRight">
                <TextFields/>
                <Create/>
                <Note/>
                <MusicNote/>
                <AttachFile/>
                <Crop/>
                <Timer/>
            </div>
            <img src={cameraImage} />
            <div onClick={sendPost} className="preview__footer">
                <h2>Send now</h2>
                <Send fontSize="small" className="preview__sendIcon" />
            </div>
        </div>
    )
}

export default Preview
