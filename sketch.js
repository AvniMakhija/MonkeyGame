
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananasGroup, obstaclesGroup;
var score;
var jungleImage, jungle;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var score = 0;
var gameOver, gameOverImage;
var restart, restartImage;
var ouch, jumpSound, yummy;

function preload()
{ 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  jungleImage01 = loadImage("jungle merged.jpg");
  
  monkey_injured = loadAnimation("monkeyCollided.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  ouch = loadSound("ouch.mp3");
  
  jumpSound = loadSound("Jump-Sound.mp3");
  
  yummy = loadSound("WOW Anime.mp3");
}



function setup() 
{
 createCanvas(600, 600);  

  jungle = createSprite(800,300);
  jungle.addImage(jungleImage01);
  jungle.scale = 0.8;
  jungle.velocityX = -(4 + score/10); 
  
  
  monkey = createSprite(100,440);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("injured", monkey_injured);
  monkey.scale = 0.25;
  
  invisibleGround = createSprite(300,520,600,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,150,50,50);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(300,300,50,50);
  restart.addImage(restartImage);
  restart.visible = false;
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  
  //monkey.debug = true;
  monkey.setCollider("rectangle",-100,0,300,monkey.height);
}


function draw() 
{
  background("white");
  
  if(gameState === PLAY)
 {
  score = score + Math.round(getFrameRate()/60);  
   
   if(keyDown("space")&& monkey.y >= 400) 
     {
      monkey.velocityY = -20;
      jumpSound.play();
     }
   monkey.velocityY = monkey.velocityY + 0.8;
 
    if (jungle.x < 0)
    {
     jungle.x = 800;
    }
  spawnObstacles();
  spawnBananas();

   if(monkey.isTouching(bananasGroup))
    {
     bananasGroup.destroyEach();
     yummy.play();
    }
   
   if(monkey.isTouching(obstaclesGroup))
     {
       gameState = END;
       ouch.play();
     }
 }  

  if(gameState === END)
  {
    monkey.changeAnimation("injured", monkey_injured);
    jungle.velocityX = 0;
    bananasGroup.setVelocityEach(0,0);
    obstaclesGroup.setVelocityEach(0,0);
    
    bananasGroup.setLifetimeEach (-1);
    obstaclesGroup.setLifetimeEach (-1);
    monkey.velocityY = 0;
    
    gameOver.visible = true;
    restart.visible = true;
  
    if(mousePressedOver(restart))
     { 
      reset();
     }
  }
  
  
  monkey.collide(invisibleGround);
  
  console.log(gameState);

  
  drawSprites();
  stroke("black");
  textSize(25);
  fill("white")
  text("Survival Time:" + score,380,80);
}

 function spawnObstacles()
{
  if(frameCount % 100 === 0)
    {
    obstacle = createSprite(600,490); 
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.25;
    obstacle.velocityX = -(6 + score/30); 
    obstacle.lifetime = 300;
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,200)
    obstaclesGroup.add(obstacle);
    }
}

function spawnBananas()
{
  if(frameCount % 100 === 0)
    {
     banana = createSprite(600,Math.round(random(120,250)));
     banana.addImage( bananaImage);
     banana.scale = 0.17;
     banana.velocityX = -6; 
     banana.lifetime = 300;
     bananasGroup.add(banana);
    }
}

function reset()
{
  gameState = PLAY;
  bananasGroup.destroyEach();
  obstaclesGroup.destroyEach();
  monkey.changeAnimation("running", monkey_running);
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
  jungle.velocityX = -4;
}

