const start = document.getElementById('start')
start.addEventListener('click', startGame)

const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')

const height = canvas.height;
const width = canvas.width;
const unit = 10;
const rows = height/unit;
const columns = width/unit;
let player1;
let player2;
let ball;
let interval;
const scorePlayer1 = document.getElementById('score1')
const scorePlayer2 = document.getElementById('score2')
let score1 = 0;
let score2 = 0;

function startGame(){
    player1 = new Pong(0,10 * unit);
    player2 = new Pong((columns * unit) - unit,10 * unit)
    ball = new Ball()
    ball.start()
    clearInterval(interval);
    interval = setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        player1.draw()
        player2.draw()
        ball.update()
        ball.draw()
        }, 50);
    

}

window.addEventListener('keydown', ((evt) =>{
    console.log(evt)
    switch (evt.key) {
        
        case 'w':
            
            player1.update('Up')
            player2.draw()
            ball.draw()
            break;
        
        case 's':
            player1.update('Down')
            player2.draw()
            ball.draw()
            break;

        case 'ArrowUp':
            player2.update('Up')
            player1.draw()
            ball.draw()
            break;
        
        case 'ArrowDown':
            player2.update('Down')
            player1.draw()
            ball.draw()
            break;
        
        // case 'Enter':

        //     if(ball.xSpeed === 0){                
        //         ball.start()
        //     }
    }

}))

