var h_lms=[];

const videoElement = document.getElementsByClassName('input_video')[0];


function onResults(results) {

  h_lms=[];
  
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      h_lms.push(landmarks)
    }
  }
  
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  minDetectionConfidence: 0.6,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();