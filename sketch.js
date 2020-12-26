//Create variables here
var database;
var dogIdle,dogHappy,dogSad;
var addFood,feed;
var fedTime, lastFed;
var foodObj;
var foodS,foodStock;
var bedroomImg,gardenImg,washroomImg;
var gameState;
var currentTime;

function preload()
{
  //load images here
  dogIdle=loadImage("images/dogImg-100 x 100.png");
  dogHappy=loadImage("images/dogImg1-200 x 200.png");
  bedroomImg = loadImage("images/BedRoom.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/WashRoom.png");
  dogSad = loadImage("images/Lazy.png");
}

function setup() {
   database = firebase.database();
  console.log(database);
  createCanvas(1000,1000);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
  
  dog = createSprite(540,500,10,10);
  dog.addImage(dogIdle);


  feed = createButton("Feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add the Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 
  foodObj = new food();
  
}


function draw() {  
  background(46,139,87);

  //foodS = new food();


  fedTime = database.ref('FeedTime')
  fedTime.on('value',(data)=>{
    lastFed = data.val();
 })

 readState = database.ref('gameState');
 readState.on("value",(data)=>{
   gameState = data.val();
 })

 if(gameState !== "Hungry"){
   feed.hide();
   addFood.hide();
   //dog.remove();
 } else {
   feed.show();
   addFood.show();
   //dog.addImage(dogIdle);
 }

 currentTime = hour();
 if(currentTime === (lastFed+1)){
   update("playing");
   foodObj.garden();
 } else if(currentTime === (lastFed+2)){
   update("sleeping")
   foodObj.bedroom();
 } else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
   update("bathing");
   foodObj.washroom();
 } else {
   update("Hungry");
   foodObj.display();
 }
//}

//if(keyWentDown(UP_ARROW)){
 // writeStock(foodS);
 // dog.addImage(dogHappy);
//} else if(keyWentUp(UP_ARROW)) {
  //dog.addImage(dogIdle);
//}

//foodObj.display();


textSize(20);
fill("white");
stroke("blue"); 

drawSprites();

//addFoods();
//feedDog();
if(lastFed>=12){
  text("Last Fed :"+ lastFed%12 + "PM", 810,30);
} else if(lastFed == 0){
        text("Last Fed : 12 A.M",810,30);
} else {
 text("Last Fed :"+ lastFed + "AM", 810,30);
}

//text("Press UP arrow to feed the dog",380,55);
text("Remaining food : " + foodS , 434, 250 );

if(foodS<=0){
  foodS = 0;
  //update("Hungry")
}

}

function readStock(data){
  foodS = data.val();
  console.log(foodS);
  foodObj.updateFoodStock(foodS);
}

//function writeStock(x){

  // if(x <= 0 ){
    // x = 0
   //} else {
    // x = x - 1;
   //}
//
  //database.ref('/').update({
   // Food : x
  //})
//}

function update(state){
  database.ref('/').update({
    gameState : state
  })
}

function addFoods(){
  foodS ++ ;
   database.ref('/').update({
     Food : foodS
   })
}

function feedDog(){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  foodObj.deductFood();
    database.ref('/').update({
      Food : foodObj.getFoodStock(),
     FeedTime : hour()
    })

 
  }


