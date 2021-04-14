var balloon,balloonImage1,balloonImage2;
var database;
var pos;

// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1400,700);
  createEdgeSprites();

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonPos = database.ref('ball/position');
  balloonPos.on("value", readPosition, showError)

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
  //balloon.collide(edge);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-10, 0);
  }
  if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    writePosition(10, 0);
    
  }
  if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    writePosition(0, -10);
    
  }
  if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    writePosition(0, 10);
    
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(a,b){
  database.ref('balloon/position').set({
      'x': pos.x + a,
      'y': pos.y + b,
  });
}
function readPosition(data) {
  
  pos = data.val();
  balloon.x = pos.x;
  balloon.y = pos.y;
}
function showError() {
  console.log("error database writing... thing");
}

