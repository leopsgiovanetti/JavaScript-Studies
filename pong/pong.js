class Pong{
    constructor(x,y){
        this.x = x
        this.y = y
        this.height = 8 * unit;

    }

    draw = function(){
        ctx.fillStyle = "gray"
        ctx.fillRect(this.x, this.y, unit, this.height)
    }

    update(direction){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if(direction === 'Up' && this.y > 0){
            this.y -= unit;
        }
        else if(direction === 'Down' && this.y < canvas.height - this.height){
            this.y += unit;
        }
        this.draw()
    }
}

class Ball{
    constructor(){
        this.x = canvas.width/2
        this.y = canvas.height/2
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x === canvas.width - 2 * unit){
            if(this.bounce(player1, player2)){
                this.xSpeed = -unit;
            }
            else{
                this.xSpeed = 0
                this.ySpeed = 0
                this.x = canvas.width/2
                this.y = canvas.height/2 
                score1++;
                scorePlayer1.textContent = score1;
            }
                           
        }
        if(this.x === unit){
            if(this.bounce(player1, player2)){
                this.xSpeed = unit;
            }
            else{
                this.xSpeed = 0
                this.ySpeed = 0
                this.x = canvas.width/2
                this.y = canvas.height/2 
                score2++;
                scorePlayer2.textContent = score2;
            }
        }
        if(this.y === 0){
            this.ySpeed = unit;
        }
        if(this.y === canvas.height - unit){
            this.ySpeed = - unit;
        }
        this.draw()
    }

    bounce(player1, player2){
        if(this.x === canvas.width - 2 * unit){
            for (let i = 0; i < player2.height;i += unit){
                if(this.y === player2.y + (i)){
                    
                    return true;
                }
            }        

        }

        if(this.x === unit){
            for (let i = 0; i < player1.height;i += unit){
                if(this.y === player1.y + (i)){
                    console.log('bounce')
                    return true;
                }
            }
        }
    }

    draw(){
        
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, unit, unit)
    }

    start(){
        
        let x = Math.random();
        let y = Math.random();
        if(x > 0.5){
            console.log('x >')
            this.xSpeed = unit;
        }
        else{
            console.log('x <')
            this.xSpeed = -unit;
        }
        if(y > 0.5){
            console.log('y >')
            this.ySpeed = -unit;
        }
        else{
            console.log('y <')
            this.ySpeed = unit;
        }       
    }
}