class Snake{
    constructor(){
        this.x = 10;
        this.y = 10;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.total = 0;
        this.tail = [];
    }
    
    draw = function() {
        
        
        for (let i = 0; i < this.tail.length; i++){
            ctx.fillStyle ="black"
            ctx.fillRect(this.tail[i].x - 1, this.tail[i].y -1, unit+2, unit+2)
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(this.tail[i].x, this.tail[i].y, unit, unit)
            
        }
        ctx.fillStyle ="black"
        ctx.fillRect(this.x - 1, this.y -1, unit+2, unit+2)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(this.x, this.y, unit, unit)
    }

    update = function() {
        
        for (let i = 0; i < this.tail.length - 1; i++){
            this.tail[i] = this.tail[i+1]
        }
        this.tail[this.total - 1] = {x: this.x, y: this.y};
        
        
        this.x += this.xSpeed * unit;
        this.y += this.ySpeed * unit;
        
        for (let i = 0; i < this.tail.length; i++){
            if(this.x === this.tail[i].x && this.y === this.tail[i].y){                
                this.total = 0;
                this.tail = [];
                this.xSpeed = 0;
                this.ySpeed = 0;
            }         
        }

        if(this.x > board.width - unit){
            this.x = 0;
        }
        if(this.x < 0){
            this.x = board.width - unit;
        }
        if(this.y > board.height - unit){
            this.y = 0;
        }
        if(this.y < 0){
            this.y = board.height - unit;
        }
    }

    changeDirection(direction){
        if(direction === 'ArrowDown' && this.ySpeed !== -1){
            snake.xSpeed = 0;
            snake.ySpeed = 1;
        }
        if(direction === 'ArrowUp' && this.ySpeed !== 1){
            snake.xSpeed = 0;
            snake.ySpeed = -1;
        }
        if(direction === 'ArrowRight' && this.xSpeed !== -1){
            snake.xSpeed = 1;
            snake.ySpeed = 0;
        }
        if(direction === 'ArrowLeft' && this.xSpeed !== 1){
            snake.xSpeed = -1;
            snake.ySpeed = 0;
        }
    }
}

function moveSnake(snake, food){
    ctx.clearRect(0, 0, board.width, board.height)
    eatFood(snake, food)
    
    food.draw()  
    snake.draw()
    
}



function addTail(snake){

}