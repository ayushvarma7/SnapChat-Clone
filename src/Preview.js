import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import { AttachFile, Close, Create, Crop, MusicNote, Note, Send, TextFields, Timer } from '@material-ui/icons';
import {v4 as uuid} from 'uuid';
import { db, storage } from './firebase';
import firebase from 'firebase';
import './Preview.css';
import { selectUser } from './features/appSlice';
 
function Preview() {
    const cameraImage= useSelector(selectCameraImage);
    //calling the camImage fn which stores the SS in cameraImage
    const history= useHistory(); 
    const dispatch = useDispatch();
    const user= useSelector(selectUser);

    useEffect(()=>{
    if(!cameraImage){ //if no image captured
        history.replace("/"); //routes back to / path
    }
    }, [cameraImage, history]); //dependent on cameraImage, history

    const closePreview=()=>{
        dispatch(resetCameraImage()); 
    }

    const sendPost= ()=>{
        const id= uuid(); 
        const uploadTask= storage  //uploads to firebase storage
        .ref(`posts/${id}`)
        .putString(cameraImage, "data_url");

        uploadTask.on(`state_changed`, null, (error)=> {
            // ERROR FUNCTION
            console.log(error);
        }, 
        ()=>{
            // COMPLETE FUNCTION 
            storage.ref('posts')
            .child(id)
            .getDownloadURL()
            .then((url)=>{
                db.collection('posts').add({
                   imageUrl: url,
                   username: user.username,
                   read: false,
                   profilePic: user.profilePic,
                   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                   //gives us a consistent timestamp throughout the world
                });
                history.replace('/chats');
                // directs to the chat screen
            })
        })
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
