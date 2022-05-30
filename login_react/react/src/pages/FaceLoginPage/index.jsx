import { useEffect, useRef, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
//import * as faceapi from 'face-api.js' ver isso depois
import '../../../public/face-api.min.js'

import './style.css'

const FaceLoginPage = () => {
   const { login } = useContext(AuthContext)

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
      faceapi.nets.faceRecognitionNet.loadFromUri('/models')
   ]).then(() => {
      faceDetection();
   }).catch( err => console.error(err))
   };

   const faceDetection = async () => {
      const labeledFaceDescriptors = await loadLabeledImages()
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7)

      const displaySize = { width: 540, height: 410 }
      faceapi.matchDimensions(canvasRef.current, displaySize)

      setInterval(async() => {
         

         const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

         const resizedDetections = faceapi.resizeResults(detections, displaySize)

         const result = faceMatcher.findBestMatch(resizedDetections.descriptor)

         canvasRef.current.getContext('2d').clearRect(0, 0, 560, 410)

         const box = resizedDetections.detection.box
         const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString()})
         drawBox.draw(canvasRef.current)

         logFace(result)
      }, 1000)
      console.log("Carregado!")
   }

   const loadLabeledImages = () => {
      const labels = ["Gabriel"]

      return Promise.all(
         labels.map(async label => {

            const descriptions = []

            for (let i = 1; i <= 2; i++) {
               const img = await faceapi.fetchImage(`/labeled_images/${label}/${i}.jpg`)

               const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()

               descriptions.push(detections.descriptor)
            }

            return new faceapi.LabeledFaceDescriptors(label, descriptions)
         })
      )
   }

   const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true    })
      .then((currentStream) => {
               videoRef.current.srcObject = currentStream;
            }).catch((err) => {
               console.error(err)
      });
   }

   const logFace = (facePerson) => {
      let user = JSON.parse(localStorage.getItem('user'))

      if (user.name === facePerson.label) {
         
         login(user.email, user.password)
      }
   }


   return (
      <div>
         <div className='login'>
               <h1>Face login</h1>
               <video crossOrigin='anonymous' ref={videoRef} autoPlay width={540} height={410}>
            </video>
         </div>
         <canvas id='canvas1' ref={canvasRef}
         className='app__canvas' width={540} height={410}/>
      </div>
   )
};
export default FaceLoginPage;