var path,boy,star,bomb,coin;
var pathImg,boyImg,starImg,bombImg;
var treasureCollection = 0;
var starG,bombG;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  starImg = loadImage("star.png");
  bombImg = loadImage("bomb.png");
  endImg =loadAnimation("gameOver.png");
  coinImg =loadImage("coin.png");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
starG=new Group();
bombG=new Group();
coinG=new Group();
}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createstar();
    createbomb();
    createCoin();

    if (starG.isTouching(boy)) {
      starG[0].destroy();
      treasureCollection=treasureCollection+100;
    }

    if(coinG.isTouching(boy)){
      coinG[0].destroy();
      treasureCollection=treasureCollection+50; 
    }
          
    if(bombG.isTouching(boy)) {
      gameState=END;

      background("black")
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over",width/2,height/2)
      
      boy.addAnimation("SahilRunning",endImg);
      boy.x=width/2;
      boy.y=height/2;
      boy.scale=0.6;
       
      starG.destroyEach();
      bombG.destroyEach();
      coinG.destrouEach();
        
      starG.setVelocityYEach(0);
      bombG.setVelocityYEach(0);
      coinG.setVelocityYEach(0);

      path.velocityY=0        
  
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill("gold");
  text("Treasure: "+ treasureCollection,width/2.2,height-550);
  }



function createstar() {
  if (World.frameCount%150===0) {
  var star = createSprite(Math.round(random(50, width-50),40, 10, 10));
  star.addImage(starImg);
  star.scale=0.4;
  star.velocityY = 3;
  star.lifetime = height;
  starG.add(star);
  }
}


function createbomb(){
  if (World.frameCount%195===0) {
  var bomb = createSprite(Math.round(random(50, width-50),40, 10, 10));
  bomb.addImage(bombImg);
  bomb.scale=0.12;
  bomb.velocityY = 3;
  bomb.lifetime = height;
  bombG.add(bomb);
  }
}

function createCoin(){
  if (World.frameCount%100===0) {
  var coin = createSprite(Math.round(random(50, width-50),40, 10, 10));
  coin.addImage(coinImg);
  coin.scale=0.5;
  coin.velocityY = 3;
  coin.lifetime = height;
  coinG.add(coin);
  }
}