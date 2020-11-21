class food{
    constructor(){
        this.foodStock = 0;
        this.lastFed = 0;
        this.image = loadImage('images/Milk-50 x 50.png')
    }

    getFoodStock(){
        var foodStockRef = database.ref('Food')
        foodStockRef.on("value",(data)=>{
        this.foodStock = data.val();
        })
    }

    updateFoodStock(food){
        database.ref('/').update({
            foodStock : food
        })
    }
    
    deductFood(x){
        //console.log(x);
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

    display(){
        
    var x = 80 , y =100 ;

    imageMode(CENTER);
    image(this.image,720,220,70,70);

            if(this.foodStock !== 0){
               for(var i=0;i<this.foodStock;i++){
                   if(i%10 === 0){
                        x = 80 ;
                        y+=50;
                 }
                    image(this.image,x,y,50,50);
                    x+=30
                }
            }
        }
    }