import React, {useState, useRef, useEffect} from "react";
import '../../../public/face-api.min.js'

import './style.css'

function FaceRegistPage () {
    const videoRef = useRef()
    const canvasRef = useRef()

    useEffect(() => {
        loadModels()
    }, [])

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

    const handleShot = async () => {
        console.log("Funcionando!")
        let canvas = document.querySelector('canvas')
        let video = document.querySelector('video')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        var context = canvas.getContext('2d')
        context.drawImage(videoRef.current, 0, 0)
        
        const link = document.querySelector('.link')
        link.download = "foto.png"
        link.href = canvas.toDataURL()

        const modal = document.getElementById('modal')
        modal.style.visibility = "visible"

        const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()

        console.log(detection)
        if (detection == undefined) alert("Não há nenhum rosto nesta imagem!")
    }

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia(
            {video: true}
        ).then((currentStream) => {
            videoRef.current.srcObject = currentStream
        }). catch((error) => console.error(error))
    }

    return (
        <div>
            <div className="container">
                <h1>Registo Facial</h1>

                <button onClick={handleShot}>Registar Rosto</button>

                <video crossOrigin="anonymous" autoPlay ref={videoRef} width={400} height={300}></video>
            </div>
            <div className="container" id="modal">
                <div className="box">
                    <h1>Checar imagem</h1>
                    <canvas id="canvasR" ref={canvasRef}></canvas>
                    <span id="link">
                        <a className="link" href="">Baixar imagem</a>
                    </span>

                    <button onClick={() => modal.style.visibility = "hidden"}>Fechar</button>
                </div>
            </div>
        </div>
    )
}

export default FaceRegistPage