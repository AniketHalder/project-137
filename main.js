status = "";
input_text = "";
objects = [];

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modeLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_text = document.getElementById("input1").value;
}

function modeLoaded()
{
    console.log("ModelLoaded");
    status = true;
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected"

            fill("#FF0000")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent+"%", objects[i].x+15 , objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_text)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = input_text + " FOUND";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text+"found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("object_status").innerHTML = input_text + " NOT FOUND";
            }
        }
    }
}

function gotResult(error, results)
{
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}