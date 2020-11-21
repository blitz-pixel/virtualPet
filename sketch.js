//Create variables here
var database;
var dogIdle,dogHappy;
var addFood,feed;
var fedTime, lastFed;
var foodObj;
var foodS,foodStock;


function preload()
{
  //load images here
  dogIdle=loadImage("images/dogImg-100 x 100.png");
  dogHappy=loadImage("images/dogImg1-200 x 200.png");
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

//}

//if(keyWentDown(UP_ARROW)){
 // writeStock(foodS);
 // dog.addImage(dogHappy);
//} else if(keyWentUp(UP_ARROW)) {
  //dog.addImage(dogIdle);
//}

textSize(20);
fill("white");
stroke("blue"); 

drawSprites();

//addFoods();
//feedDog();

foodObj.display();
text("Press UP arrow to feed the dog",380,55);
text("Remaining food : " + foodS , 434, 250 );

}

function readStock(data){
  foodS = data.val();
  console.log(foodS);
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


function addFoods(){
  foodS ++ ;
   database.ref('/').update({
     Food : foodS
   })
}

function feedDog(){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').set({
      Food : foodObj.getFoodStock(),
     // FeedTime : hour()
    })

  
  }


