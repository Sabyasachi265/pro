function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("label").innerHTML = "status : detecting objects";
}

song="";
status_ ="";
objects = [];

function modelLoaded(){
    console.log("model is loaded");
    status_=true;
}

function preload(){
    song = loadSound("iphone_13_original.mp3");
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    
    else{
        console.log(results);
        objects=results;
    }
    }

function draw(){
    image(video, 0, 0, 380, 380);
    if(status_!=""){
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("label").innerHTML = "Status : Objects Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person"){
            document.getElementById("Numberofobjects").innerHTML = "Baby detected";
            console.log("stop");
            song.stop();
            }
            else{
                document.getElementById("Numberofobjects").innerHTML = "Baby not detected";
                console.log("continue");
                song.play()
            }
        }
        if(objects.length == 0){
            document.getElementById("Numberofobjects").innerHTML = "Baby not detected";
            console.log("continue");
            song.play() 
        }
    }
}

