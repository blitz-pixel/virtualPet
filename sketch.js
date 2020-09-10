//Create variables here
var database;
var dog1,dog2,dogIdle,dogHappy;
var feed,addFood;
var fedTime,lastFed;
var foodObj,foodS
//foodStock,lastFed;

//var milkImg,milk;

function preload()
{
  //load images here
  dogIdle=loadImage("images/dogImg-100 x 100.png");
  dogHappy=loadImage("images/dogImg1-200 x 200.png");
  milkImg = loadImage("images/Milk-50 x 50.png")
}

function setup() {
   database = firebase.database();
  console.log(database);
  createCanvas(1000, 1000);

  foodObj = new food();
  
  dog = createSprite(540,500,10,10);
  dog.addImage(dogIdle);

  feed = createButton("Feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add the Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  
}


function draw() {  
  background(46,139,87);

  //foodS = new food();
  foodObj.display();

  fedTime = database.ref('FeedTime')
  fedTime.on('value',(data)=>{
    lastFed = data.val();
  })

}

//function readStock(data){
  //foodS = data.val();
  //console.log(foodS);
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
      Food : foodObj.getFoodStock,
      FeedTime : hour()
    })
  



}


