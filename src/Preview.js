import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import CloseIcon from "@material-ui/icons/Close";
import './Preview.css';

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
    return (
        <div className="preview">
            <CloseIcon onClick={closePreview}
            className="preview__close"/>
            <h2>THIS IS THE PREVIEW</h2>    
            <img src={cameraImage} />
        </div>
    )
}

export default Preview
