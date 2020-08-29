//Create variables here
var database;
var dog1,dog2,dogIdle,dogHappy;
var food,foodS,foodStock;
var x;

function preload()
{
  //load images here
  dogIdle=loadImage("images/dogImg-100 x 100.png");
  dogHappy=loadImage("images/dogImg1-200 x 200.png");
}

function setup() {
   database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  
  //dog2 = createSprite(240,240,10,10);
  dog1 = createSprite(240,240,10,10);
  dog1.addImage(dogIdle);

foodStock= database.ref('Food');
foodStock.on("value",readStock);

//console.log('/'.x);

}


function draw() {  
  background(46,139,87);
  if(foodS !== undefined){
  if(keyWentDown(UP_ARROW)){
    //food = createSprite(240,5,10,10);
    //food.velocityY = 2;
    writeStock(foodS);
    dog1.addImage(dogHappy);
    //console.log(food.visible);
    //dog2.visible = true;
     //dog1.visible = false;
    // if(food.isTouching(dog1)){
     //food.visible = false;
     }
  
//}
   if(keyWentUp(UP_ARROW)){
    dog1.addImage(dogIdle);
    //food.velocityY = 0;
    //dog1.visible = true;
    //dog2.visible = false;
  }
  //if(x=0  ){
    //dog1.aadImage(dogHappy);
    //textSize(20);
    //text("Game Over",100,100)  
  //}
  }
  drawSprites();
  textSize(20);
  text("Press up Arrow to feed",100,100);
  //text("Food:" + x,400,400)
  //add styles here

}



function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  //if(keyWentDown(UP_ARROW)){
    //x= x-1;
  //}
  console.log(x);
  if(x<=0){
    //x=0;
    //x=x+1
    x = 0;
  } else {
    x = x-1 ;
  }
 
  database.ref('/').update({
    'Food' : x
  })
}


