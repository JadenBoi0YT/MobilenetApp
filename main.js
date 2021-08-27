Webcam.set({
    width:310,
    height:300,
    img_format:"png",
    png_quality:90,
    crop_width:200,
    crop_height:200,
    constraints:{
        facingMode:"enviorment"
    }
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

Sound = new Audio();
Sound.src="Click.mp3";

function takeSnapshot(){
    Sound.play();
    document.getElementById("buttonThing").innerHTML = "<button onclick='crop()' class='btn btn-danger'>Crop</button>"
    /*Webcam.freeze();*/
    Webcam.snap(function(data_uri){document.getElementById("result").innerHTML = "<img id='previewImg' src='" + data_uri + "'>";});
}

/*Webcam.on( 'uploadProgress', function(progress) {
    // Upload in progress
    // 'progress' will be between 0.0 and 1.0
    document.getElementById("ProgressTime").innerHTML = progress;
} );

Webcam.on( 'uploadComplete', function(code, text) {
    document.getElementById("ProgressTime").innerHTML = "Complete!"
    // Upload complete!
    // 'code' will be the HTTP response code from the server, e.g. 200
    // 'text' will be the raw response content
} );

Webcam.upload( data_uri, 'myscript.php' );*/

function crop(){
    document.getElementById("previewImg").style.width = 250; 
    document.getElementById("previewImg").style.height = 250;
}

console.log("ml5.verson", ml5.version);

classifier= ml5.imageClassifier("MobileNet", modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function check(){
    img = document.getElementById("previewImg");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        percentage = results[0].confidence*100;
    if (percentage >= 50){
      document.getElementById("object_name").innerHTML = "I am sure that this is: " + results[0].label;
    }
    else{
      document.getElementById("object_name").innerHTML = "I think this is: " + results[0].label;
    }
    }

}