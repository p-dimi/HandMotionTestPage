const videoElement = document.getElementsByClassName('input_video')[0];

function onResults(results) {
  if (results.detections.length > 0) {
    for(const detection of results.detections){
      console.log(detection.boundingBox)
    }
  }
}

const faceDetection = new FaceDetection({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.0/${file}`;
}});
faceDetection.setOptions({
  modelSelection: 0,
  minDetectionConfidence: 0.5
});
faceDetection.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceDetection.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();