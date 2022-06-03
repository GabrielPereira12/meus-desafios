import React, { useState, useRef, useContext, } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/auth'

import './style.css'

function FaceRegistPage () {
    const navigate = useNavigate()
    const { registFace, getEmailRegist } = useContext(AuthContext)

    const [email, setEmail] = useState()

    const videoRef = useRef()
    const canvasRef = useRef()

    const loadModels = () => {
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
       ]).then(() => {
           console.log("!MODELS CARREGADOS!")
           startVideo()
       }).catch((error) => {
           console.log("!ERRO AO CARREGAR OS MODELS!")
           console.error(error)
       })
    }

    const handleEmail = () => {
        getEmailRegist(email)
        let emailModal = document.getElementById('email_modal')
        let videoElement = document.getElementById('video')
        emailModal.style.visibility = "hidden"
        videoElement.style.visibility = "visible"

        loadModels()
    }

    const handleShot = async () => {
        let canvas = document.querySelector('canvas')
        let video = document.querySelector('video')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        var context = canvas.getContext('2d')
        context.drawImage(videoRef.current, 0, 0)

        const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()

        if (detection == undefined) {
            alert("Não há nenhum rosto nesta imagem!")
        }else {
            const modal = document.getElementById('check_modal')
            modal.style.visibility = "visible"

            const descriptions = []

            const img = await faceapi.fetchImage(canvas.toDataURL())
            const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()

            if(!detections) {
                alert("Rosto não reconhecido, tente de novo")
                modal.style.visibility = "hidden"
            }else {
                descriptions.push(detections.descriptor)
                let proxModal = document.getElementById('prox_modal')
                proxModal.hidden = false

                registFace(JSON.stringify(descriptions))
            }
        }
    }

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia(
            {video: true}
        ).then((currentStream) => {
            videoRef.current.srcObject = currentStream
            let btnCaptura = document.getElementById('btn_captura')
            btnCaptura.hidden = false
        }). catch((error) => console.error(error))
    }

    return (
        <div>
            <div className="container">
                <h1>Registo Facial</h1>
                <div className="container modal" id="email_modal">
                    <div className="box email_box">
                        <h1>Conectar a conta</h1>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={(event) => setEmail(event.target.value)}/>
                        <button id="btn_email" onClick={handleEmail}>Conectar</button>
                    </div>
                </div>

                <button id="btn_captura" hidden onClick={handleShot}>Registar Rosto</button>

                <video crossOrigin="anonymous" autoPlay ref={videoRef} width={400} height={300} id="video"></video>
            </div>
            <div className="container modal" id="check_modal">
                <div className="box">
                    <h1>Checar imagem</h1>
                    <canvas id="canvasR" ref={canvasRef}></canvas>

                    <div id="prox_modal" hidden>
                        <p>Rosto Verificado com sucesso</p>
                        <button onClick={() => {
                            navigate('/login')
                    }}>Pronto</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaceRegistPage