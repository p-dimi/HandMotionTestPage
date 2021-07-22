var screen_width = 600;
var screen_height = 400;

var grabRadius = 50;


// little object to move around
var objectX = screen_width/2
var objectY = screen_height/2
var objectSize = 50




function getSquare(handLandmarksArray){
  const hand = [0,1,5,9,13,17];
  const fingers = [4,8,12,16,20];

  
  let grabArray=[]
  
  for(const handLandmarks of handLandmarksArray){
    // go over hand points and make bounding box by collecting upmost, leftmost, rightmost, and bottommost points

    
    let leftMostHand = 1
    let downMostHand = 1
    let upMostHand = 0
    let rightMostHand = 0

    for (const idc of hand){
      let x = handLandmarks[idc].x
      let y = handLandmarks[idc].y

      if (x <= leftMostHand){
        leftMostHand = x
      }
      if (rightMostHand <= x){
        rightMostHand = x
      }
      if (y <= downMostHand){
        downMostHand = y
      }
      if (upMostHand <= y){
        upMostHand = y
      }

    }

    // get the diagonal of this bounding box
    let handDiag = Math.hypot( rightMostHand*screen_width - leftMostHand*screen_width , upMostHand*screen_width - downMostHand*screen_width )

    // go over the finger points and do the same
    let leftMostFingers = 1
    let downMostFingers = 1
    let upMostFingers = 0
    let rightMostFingers = 0

    for (const idc of fingers){
      let x = handLandmarks[idc].x
      let y = handLandmarks[idc].y

      if (x <= leftMostFingers){
        leftMostFingers = x
      }
      if (rightMostFingers <= x){
        rightMostFingers = x
      }
      if (y <= downMostFingers){
        downMostFingers = y
      }
      if (upMostFingers <= y){
        upMostFingers = y
      }

    }
    // get the diagonal of this bounding box
    let fingersDiag = Math.hypot( rightMostFingers*screen_width - leftMostFingers*screen_width , upMostFingers*screen_width - downMostFingers*screen_width )

    let handCenter = [ screen_width - (rightMostHand - (abs(rightMostHand - leftMostHand)/2))*screen_width , (upMostHand - (abs(upMostHand - downMostHand)/2))*screen_height ]
    
    if (fingersDiag <= handDiag){
      grabArray.push([true, handCenter])
    } else {
      grabArray.push([false, handCenter])
    }
    
  }
  
  return grabArray
  
}


function setup() {
  createCanvas(screen_width, screen_height);
  
  handImage = loadImage('hand.png')
  grabImage = loadImage('grab.png')
  
}

function draw() {
  background(255,200,200);
  
  let grabbed = []
  //console.log(h_lms)
  //console.log(h_lms.length)  

  fill("green")
  circle(objectX,objectY,objectSize)
  
  try {
    grabbed = getSquare(h_lms) 
  }
  catch {
    //pass
  }
  
  /*
  fill('white')
  for (var i = 0; i < h_lms.length;  i++){
    var h = h_lms[i]
    for(var n = 0; n < h.length; n++){
      //console.log(h[n])
      circle(screen_width - (h[n].x*screen_width), h[n].y*screen_height, 10)
    }
  }
  */
  try {
    for(const grabStatus of grabbed){
      if(grabStatus[0]){
        /*fill('red')
        circle(grabStatus[1][0], grabStatus[1][1], grabRadius)*/
        // grab gabbable object if grabbable object is within the radius
        image(grabImage, grabStatus[1][0], grabStatus[1][1])
        
        if(Math.hypot(abs(objectX - grabStatus[1][0]) , abs(objectY - grabStatus[1][1])) <= grabRadius) {
          objectX = grabStatus[1][0]
          objectY = grabStatus[1][1]
        }
      } else {
        image(handImage, grabStatus[1][0], grabStatus[1][1])
      }
    }  
  }
  catch {
    //pass
  }
  
}