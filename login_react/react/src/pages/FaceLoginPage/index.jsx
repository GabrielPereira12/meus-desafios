import { useRef, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'
//import * as faceapi from 'face-api.js' ver isso depois

import './style.css'

const FaceLoginPage = () => {
   const { faceLogin, getEmail } = useContext(AuthContext)
   const navigate = useNavigate()

   const videoRef = useRef();
   const canvasRef = useRef();

   const [email, setEmail] = useState()

   const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models')
   ]).then(() => {
      faceDetection();
   }).catch((error) => {
      console.log("!ERRO AO CARREGAR OS MODELS!")
      console.error(error)
  })
   };

   const faceDetection = async () => {
      const labeledFaceDescriptors = await loadLabeledImages()
      console.log(labeledFaceDescriptors)
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7)
      console.log(faceMatcher)

      const displaySize = { width: 540, height: 410 }
      faceapi.matchDimensions(canvasRef.current, displaySize)

      setInterval(async() => {
         const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

         const resizedDetections = faceapi.resizeResults(detections, displaySize)

         const result = faceMatcher.findBestMatch(resizedDetections.descriptor)
         console.log(result)
         const getLog = false
         logFace(result, getLog)

         if (getLog) clearInterval()
      }, 1000)
      console.log("Carregado!")
   }

   const loadLabeledImages = () => {
      const desc = JSON.parse(localStorage.getItem('userEmailId')).userFaceDescription
      const descript = JSON.parse(desc)[0]
      const descriptions = Object.values(descript)

      console.log(descriptions)
      const description = [new Float32Array(descriptions)]
      console.log(description)

      
      return new faceapi.LabeledFaceDescriptors(email, description)
   }

   const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
               videoRef.current.srcObject = currentStream;
            }).catch((err) => {
               console.error(err)
      });
   }

   const logFace = (facePerson, getLog) => {
      let user = JSON.parse(localStorage.getItem('userEmailId'))
      if (user === null) {
         alert("Rosto não registrado!")
         navigate('/regist')
         window.location.reload()
      }else if (user.userEmail === facePerson.label) {
         localStorage.clear()
         faceLogin(user.userId, user.userEmail)
         window.location.reload()
         return getLog = true
      }
   }

   const handleEmail = async (event) => {
      event.preventDefault()
      getEmail(email)

      let cont = document.getElementById('containerEmail')
      cont.style.visibility = "hidden"
      cont.style.position = "absolute"

      startVideo();
      videoRef && loadModels();
   }


   return (
      <div>
         <div className='login'>
               <h1>Face login</h1>
               <form onSubmit={handleEmail} id="containerEmail">
                  <input type="email" name="email" id="email" placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
                  <button type='submit'>Conectar</button>
               </form>
               <video crossOrigin='anonymous' ref={videoRef} autoPlay width={540} height={410}>
            </video>
         </div>
         <div id="canvas">
            <canvas id='canvas1' ref={canvasRef} width={540} height={410}/>
         </div>
      </div>
   )
};
export default FaceLoginPage;