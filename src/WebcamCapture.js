import react, { useRef } from 'react';
import Webcam from "react-webcam";


const videConstraints={
width: 250,
height: 400, 
facingMode: "user",
};



function WebcamCapture() {
    const webcamRef = useRef(null);
    
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
        </div>
    )
}

export default WebcamCapture
