import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js'

import './style.css'

const FaceLoginPage = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
 }, []);

 const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]).then(() => {
     faceDetection();
    })
 };

 const faceDetection = async () => {
    const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

    console.log(detections);
 }

  const startVideo = () => {
     navigator.mediaDevices.getUserMedia({ video: true    })
     .then((currentStream) => {
             videoRef.current.srcObject = currentStream;
          }).catch((err) => {
             console.error(err)
     });
  }


return (
    <div>
        <div className='login'>
            <h1>Face login</h1>
            <video crossOrigin='anonymous' ref={videoRef} autoPlay width={540} height={410}>
           </video>
        </div>
        <canvas ref={canvasRef}
        className='app__canvas' />
    </div>
  )
};
export default FaceLoginPage;