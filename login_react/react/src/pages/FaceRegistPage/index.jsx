import React, { useRef, useEffect} from "react";

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
        let canvas = document.querySelector('canvas')
        let video = document.querySelector('video')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        var context = canvas.getContext('2d')
        context.drawImage(videoRef.current, 0, 0)

        const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()

        console.log(detection)
        if (detection == undefined) {
            alert("Não há nenhum rosto nesta imagem!")
        }else {
            const modal = document.getElementById('modal')
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
                console.log(descriptions)
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

                <button id="btn_captura" hidden onClick={handleShot}>Registar Rosto</button>

                <video crossOrigin="anonymous" autoPlay ref={videoRef} width={400} height={300}></video>
            </div>
            <div className="container" id="modal">
                <div className="box">
                    <h1>Checar imagem</h1>
                    <canvas id="canvasR" ref={canvasRef}></canvas>

                    <div id="prox_modal" hidden>
                        <p>Rosto Verificado com sucesso</p>
                        <button onClick={() => {
                            modal.style.visibility = "hidden"
                            let proxModal = document.getElementById('prox_modal')
                            proxModal.hidden = true
                    }}>Próximo</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaceRegistPage