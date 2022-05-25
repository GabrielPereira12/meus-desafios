import './style.css'
import './face-api.min.js'
import React, { useState, useRef, useEffect } from 'react'

const FaceLoginPage = () => {
    const [modelsLoaded, setModelsLoaded] = useState(false)
    const [captureVideo, setCaptureVideo] = useState(false)
    
    const videoRef = useRef()
    const videoHeight = 420
    const videoWidth = 560
    const canvasRef = useRef()

    useEffect(() => {
        const loadModels = async () => {
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
                faceapi.nets.faceExpressionNet.loadFromUri('./models'),
                faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
            ]).then(setModelsLoaded(true))
        }
        loadModels()        
    }, [])

    const startVideo = () => {
        setCaptureVideo(true)
        navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            let video = videoRef.current
            video.srcObject = stream;
            video.play()
        })
        .catch(error => console.error("error: ", error))
    }

    const handleVideoOnPlay = async () => {
        const labeledFaceDescriptors = await loadUsersImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7)

        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current)
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight
                }

                faceapi.matchDimensions(canvasRef.current, displaySize)

                const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpression()

                const resizedDetections = faceapi.resizeResults(detections, displaySize)

                const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

                results.forEach((result, i) => {
                    const box = resizedDetections[i]
                    .detection.box

                    const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString()})
                    drawBox.draw(canvas)
                })
            }
        }, 100)
    }

    const loadUsersImages = () => {
        const labels = [
            "Gabriel"
        ]

        return Promise.all(
            labels.map(async label => {
                const descriptions = []
                for (let i = 1; i <= 1; i++) {
                    let img = await faceapi.fetchImage(`./labeled_images/${label}/${i}.jpg`)

                    const detections = await faceapi.detectSingleFace(img).withFaceLandMarks().withFaceDescriptor()

                    descriptions.push(detections.descriptor)
                }

                return new faceapi.LabeledFaceDescriptors(label, descriptions)
            })
        )
    }

    const closeWebcam = () => {
        videoRef.current.pause()
        videoRef.current.srcObject.getTracks()[0].stop()
        setCaptureVideo(false)
    }

    return (
        <div className="body">
            <div>
                <h1>Face Login</h1>
                {
                    captureVideo && modelsLoaded ?
                    <button onClick={closeWebcam}>
                        Close Webcam
                    </button>
                    :
                    <button onClick={startVideo}>
                        Open Webcam
                    </button>
                }
            </div>
            <div>
            {
                captureVideo ?
                    modelsLoaded ?
                        <div>
                            <div className="videoContainer">
                                <video ref={videoRef} width={videoWidth} height={videoHeight} onPlay={handleVideoOnPlay}></video>
                                <canvas ref={canvasRef}></canvas>
                            </div>
                        </div>
                        :
                    <div>Carregando...</div>
                :
                <>
                </>
            }
            </div>
        </div>
    )
}

export default FaceLoginPage;