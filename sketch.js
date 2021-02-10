
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var score,survivalTime=0,jungleimg,jungle;
var gamestate="play";

function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleimg=loadImage("jungle.jpg");
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(80,357,20,20);
  monkey.addAnimation("addinganimation",monkey_running);
  monkey.scale=0.09;
  
  jungle=createSprite(200,200)
  jungle.addImage("addingImage",jungleimg);
  
  monkey.depth=jungle.depth+1;
  
  ground=createSprite(400,371,900,10);
  ground.velocityX=-4;
  ground.visible=false;
  
  monkey.collide(ground);
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  score=0;
}
function draw() {
    background("white");
  if(gamestate==="play"){
  jungle.velocityX=-2;
  if(jungle.x<0){
      jungle.x=jungle.width/2;
  }
  if(frameCount%24===0){
    survivalTime=survivalTime+1
  }
  
  if(ground.x<0){
      ground.x=ground.width/2;
  }
    
  if(keyDown("SPACE")&&monkey.y>235){
      monkey.velocityY=-10
  }
    
  monkey.velocityY=monkey.velocityY + 0.5
  monkey.collide(ground);
    
    spawnbananas();
    spawnobstacles();
    
  if(FoodGroup.isTouching(monkey)){ 
      FoodGroup.destroyEach();
      score=score+2
     }
  if(obstacleGroup.isTouching(monkey)){
      gamestate="end"
      }
      drawSprites();
  stroke("green");
  fill("green")
  text("Score="+score,325,30);
  
  text("Survival Time="+survivalTime,295,15)
    }
    if(gamestate==="end"){
      textSize(40)
      text("GAME OVER",100,200)
      text("YOUR SCORE "+score,75,250)
    }

  
  
  switch(score){
    case 10:monkey.scale=0.1
    break; 
    case 20:monkey.scale=0.13
    break;
    case 30:monkey.scale=0.15
    break;
    case 40:monkey.scale=0.17
    break;
    default: break;
  }
  
  
  
}

function spawnbananas(){
  if(frameCount%80===0){
    banana=createSprite(200,200,1,1);
    banana.addImage("addingimage",bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(100,200));
    banana.velocityX=-2;
    banana.lifetime=200;
    FoodGroup.add(banana);
  }
}

function spawnobstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(350,357,1,1);
    obstacle.collide(ground);
    obstacle.addImage("addingimage",obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-2;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}






