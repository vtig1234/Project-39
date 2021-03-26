//Project 19
//15/01,2021
//Viyath Wanninayake

//Create variables for the background
var back, back1
//Create variables for the explorer
var explorer, explorer1
//Create a sprite for the invisible ground
var invisibleGround
//Create sprites for the tiger
var tiger, tigerIMG
//Create a sprite for the coin
var coin, coinIMG
//Create groups for the tiger and the coins
var tigerGroup
var coinGroup
//Create a score
var score= 0
//Create variables for the gamestate 
var PLAY=0
var END=1  
var gameState=PLAY
var cam


function preload(){
  //Add images to the necessary sprites
 back1 = loadImage("Viyath background.png");
 explorer1 = loadAnimation("detective.png","detective1.png", "detective3.png");
  tigerIMG = loadImage("tiger.png");
  coinIMG= loadImage("coin.png");
}
  function setup(){
  createCanvas(displayWidth, displayHeight,WEBGL);
  cam = createCamera(200,200);
  //Create the background
  back=createSprite(200,0,400,400)
  //Add animation to it
  back.addImage(back1);
  //Make it move continuously
  back.x=back.width/2;
  //Make the background move left
  back.velocityX=-4;
  back.scale = 2.3
  //Create new groups for the coins and the tigers
  coinGroup = new Group();
  tigerGroup = new Group();
  //Create an invisible ground sprite
  invisibleGround = createSprite(0,400,5000,10);
  //Create an explorer 
  explorer = createSprite(150,320,50,50);
  explorer.addAnimation("exp", explorer1);
  explorer.scale=0.3
  // cam.position.x = displayWidth/2;
}

function draw(){
  background(210);
  text("Score: "+score,250,50);
  //Make the background move continuously
  if (back.x===0){
    back.x=back.width/2;
  }
 //If the game is running
 if (gameState===PLAY){
//Make the explorer jump if the space key is pressed
 if (keyDown("space") && explorer.y>300){
   explorer.velocityY=-20; 
 } 
  //Spawn tigers and coins
  spawn();
  coins();
   //End the game if the tiger touches the explorer
    if (explorer.isTouching(tigerGroup)){
    gameState=END;
   }
  //Increase the score of the explorer touches the coins
 if (explorer.isTouching(coinGroup)){
   score=score+1;
   coinGroup[0].destroy();
 }
 }else if (gameState===END){
   //Stop everything moving
   tiger.velocityX=0;
   back.velocityX=0;
   coin.velocityX=0;
   score=0;
   text("PRESS R TO RESTART",100,250);
   //If r is pressed restart the game
  if (keyDown("r")){
  gameState=PLAY;
    tiger.x=500;
    coin.x=500;
    back.velocityX=-4;
  }
 }
  //Set the collider radius for the rectangle
explorer.setCollider("rectangle",-275,0,200,450)

//Add gravity to the explorer
 explorer.velocityY=explorer.velocityY+0.6;
 explorer.collide(invisibleGround);
  

  drawSprites();
  textSize(25);
  //Add texts for the score and the game over
  text("Score: "+score,250,50);
  if (gameState===END){
  text("GAME OVER!",150,200);
  text("PRESS R TO RESTART",displayWidth/2, 500);
  }
}

function spawn(){
  if (frameCount%150===0){
    //Create a sprite for the tiger
    tiger=createSprite(windowWidth+20, 350, 20,20);
    //Add image to the tiger
    tiger.addImage(tigerIMG);
    tiger.scale=0.5
    //Make it move left
    tiger.velocityX=-4;
    tigerGroup.add(tiger);
  }
}

function coins(){
  if(frameCount%100===0){
    //Create a coin sprite
    coin = createSprite(500,150,20,20);
    //Make it appear at random y positions
    coin.y=Math.round(random(100,300));
    //Add animation to the coin
    coin.addImage(coinIMG);
    //make it move left
    coin.velocityX=-4.5;
    coin.scale=0.07;
    coinGroup.add(coin);
  }  
}
