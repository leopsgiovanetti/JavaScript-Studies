const board = document.getElementById('board');
const unit = 10;
const rows = board.height / unit;
const columns = board.width / unit;


const ctx = board.getContext("2d");

let snake;
let food;
const start = document.getElementById('start');
start.addEventListener('click', startGame)

function startGame(){
    snake = new Snake();
    snake.draw()
    food = new Food();
    food.draw()
    const interval = setInterval(function() {
        snake.update();
        moveSnake(snake, food);
        }, 100);
    

}



window.addEventListener('keydown', ((evt) => {
    snake.changeDirection(evt.key)
} ))