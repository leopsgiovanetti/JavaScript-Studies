class Food{
    constructor(){
        this.x = Math.floor(Math.random() * columns) * unit ;
        this.y = Math.floor(Math.random() * rows) * unit ;
    }

    draw = function() {
        ctx.fillStyle = "#F00";
        ctx.fillRect(this.x, this.y, unit, unit)
        
    }
}

function eatFood(snake, food){
    if(snake.x === food.x && snake.y === food.y){        
        food.x = Math.floor(Math.random() * columns) * unit ;
        food.y = Math.floor(Math.random() * rows) * unit ;
        snake.total++
    }
}