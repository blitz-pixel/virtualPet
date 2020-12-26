class food{
    constructor(){
        this.foodStock;
        this.image = loadImage('images/Milk-50 x 50.png')
    }

    getFoodStock(){
      return this.foodStock;
    }

    updateFoodStock(food){
      this.foodStock = food;
    }
    
    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }
    }

    bedroom(){
        background(bedroomImg,1000,1000)
    }

    garden(){
        background(gardenImg,1000,1000);
    }

    washroom(){
        background(washroomImg,1000,1000);
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