status="";

objects=[];





function setup(){
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();

objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";


}


function modelLoaded(){
    console.log("Model Loaded!")
    status = "true";
    

}


function gotResult(error,results){
    if(error)
    {
    console.error(error);

   }
   else 
   {
       console.log(results);
       objects = results;
   }


}



function draw(){
image(video , 0 , 0 , 380 , 380 );
    if (status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++)
        {

            r = random(255);
            g = random(255);
            b = random(255);
            
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "No. of Objects detected are:"+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}
