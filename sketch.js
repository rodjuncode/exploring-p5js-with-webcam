let cam;

let p;
let poseNet;
let pose;

let pulsersCanvas;
let segmentation;
let mask;
let bodyPix;
const bodyPixOptions = {
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.4 // 0 - 1, defaults to 0.5 
}

function preload() {
	bodyPix = ml5.bodyPix(bodyPixOptions);
}

function setup() {
	createCanvas(640, 360);

	cam = createCapture(VIDEO);
	cam.size(width, height);
	cam.hide();
	
	p = SimpleAnchor(width/2,height/2,100,color(255,255,255,125));
	
	poseNet = ml5.poseNet(cam);
	poseNet.on('pose', gotPoses);

	pulsersCanvas = createGraphics(width,height);
	pulsersCanvas.ellipse(100,100,10,10);
	bodyPix.segment(cam, gotSegmentation)
}

function draw() {

	image(cam,0,0);

	pulsersCanvas.clear();
	if (pose) {
		p.location = createVector(pose.nose.x, pose.leftEye.y);
		p.pulse(pulsersCanvas);
	}
	var pulsersImg = createImage(pulsersCanvas.width,pulsersCanvas.height);
	if (mask != null) {
		pulsersImg.copy(pulsersCanvas, 0, 0, pulsersCanvas.width, pulsersCanvas.height, 0, 0, pulsersCanvas.width, pulsersCanvas.height)
		pulsersImg.mask(mask);
		image(pulsersImg,0,0);	// <-- it's showing the pulsers here		
	} 


	
}

function myDistSq(x1, y1, z1, x2, y2, z2) {
	let d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) + (z2-z1)*(z2-z1);
	return d;
}

function gotPoses(poses) {
	if (poses.length > 0) {
		pose = poses[0].pose;
	}
}

function gotSegmentation(err, result) {
    if (err) {
        console.log(err)
        return
	}
	mask = result.personMask;
    bodyPix.segment(cam, gotSegmentation)
}


