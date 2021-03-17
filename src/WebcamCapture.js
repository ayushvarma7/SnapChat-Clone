import react, { useRef, useCallback, useState } from 'react';
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const videConstraints={
width: 250,
height: 400, 
facingMode: "user",
};



function WebcamCapture() {
    const webcamRef = useRef(null);
    const [image, setImage]= useState(null);
    
    const capture = useCallback(() => {
            const imageSrc= webcamRef.current.getScreenshot();
            console.log(imageSrc);
            // setImage(imageSrc); //stores the image captured through the cam
            //to image using the setImage hook
        },
        [webcamRef], //this is the dependency of this fn
    )
    return (
        <div className="webcamCapture">
            <Webcam
                audio={false}
                height={videConstraints.height}
                width={videConstraints.width}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videConstraints}
            />

            <RadioButtonUncheckedIcon 
                className="webcamCapture__button"
                onClick={capture}
                fontSize="large" 
            />
            {/* <img src={image} alt="image captured"/> renders the image */}
        </div>
    )
}

export default WebcamCapture
