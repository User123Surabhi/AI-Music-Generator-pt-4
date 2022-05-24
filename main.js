song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreleftwrist = 0;
function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw() {
    image(video,0,0,600,500);

    fill("red");
    stroke("black");

    if(scoreleftwrist > 0.2)
    {
        circle(leftWristX,leftwristY,20);
        InNumberleftwristy = Number(leftwristY);
        remove_decimals = floor(InNumberleftwristy);
        volume = remove_decimals/500;
        document.getElementById("Volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}
function preload() {
    song = loadSound("music.mp3");
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() {
    console.log('PoseNet is initialized');
}
function gotPoses(results) {
    if(results.length >0)
    {
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[0].score;
        console.log("ScoreLeftWrist = " + scoreleftwrist);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftwristX = " + leftwristX + "leftwristY" + leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightwristX" + rightwristX + "rightwristY" + rightwristY);
    }
}