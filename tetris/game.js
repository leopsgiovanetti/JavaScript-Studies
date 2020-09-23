const start = document.getElementById('startGame')
start.addEventListener('click', startGame)
const unit = 20;
const mainCanvas = document.getElementById('canvas');
const nextBlockCanvas = document.getElementById('nextBlock');

const ctx = mainCanvas.getContext('2d');

const nbCtx = nextBlockCanvas.getContext('2d');

const scoreBoard = document.getElementById('score')
let score = 0;

const pointsTable = [0, 40, 100, 300, 1200] 

let interval;

let surface = [];

let nextBlock;
let block;

function startGame(){
    //blocks start buttom
    //drops first block
    //loads second block into
    start.setAttribute('disabled', 'true')
    block = new Block(Math.floor(Math.random()*7)+1)
    nextBlock = new Block(Math.floor(Math.random()*7)+1)
    nextBlock.initialForm()

    // nextBlock.drawNext()
    
    block.fall()
    

    
    interval = setInterval(
        function(){
            //update block
            console.log('time')
            block.update()
            if(block.ySpeed === 0){
                for(let i = 0; i < 4 ; i++){
                    surface.push(block.coord[i])
                }
                
                (surface.sort(function(a, b){return a.x - b.x})).sort(function(a, b){return a.y - b.y})

                
                surface = checkTetris(surface)
                block = new Block(nextBlock.shapeCode)
                block.fall()
                nextBlock = new Block(Math.floor(Math.random()*7)+1);
                nextBlock.initialForm();
            }

            

            nbCtx.clearRect(0 , 0, nextBlockCanvas.width, nextBlockCanvas.height);            
            ctx.clearRect(0 , 0, mainCanvas.width, mainCanvas.height)
            ctx.fillStyle = block.color;
            block.draw()
            nbCtx.fillStyle = nextBlock.color;
            nextBlock.drawNext()
            drawSurface()
            console.log('check')
            //
            if (gameOver()){
                clearInterval(interval)                
                console.log('game over')
            }

        },500)
}

function drawSurface(){
    ctx.fillStyle = "white";
    for(let i = 0; i < surface.length; i++){        
        ctx.fillRect(surface[i].x, surface[i].y, unit, unit)
    }

}

function checkTetris(surface){
    let newSurface;
    // console.log('entrou na checkTetris')
    let firstRow = mainCanvas.height - unit;
    let lastRow = Math.min(...surface.map(a => a.y));
    let lastCol = mainCanvas.width;
    let completeRow = lastCol/unit;
    let tetris = [];
    // console.log(`firstRow = ${firstRow}, lastRow = ${lastRow}, lastCol = ${lastCol} , completeRow = ${completeRow}`)
    for(let rows = firstRow; rows >= lastRow ; rows -= unit){

        // console.log(rows);
        let counter = 0;
        for(let cols = 0; cols < lastCol; cols += unit){
            if(surface.findIndex(a => (a.x === cols && a.y === rows)) === -1){
                // console.log(`sem elementos no x: ${cols} e y: ${rows}`)
                counter = -10;
            }
            counter++;
        }

        
        if(counter === completeRow){            
            tetris.push(rows);
            // console.log(`tetris: ${tetris} row: ${rows}`);
            surface.splice(surface.findIndex(a => (a.y === rows)),completeRow)
        }
    }

    for (let rows = firstRow; rows >= lastRow ; rows -= unit){
        surface.forEach(a =>{if(a.y < rows){a.y += unit * tetris.length}})
    }

    
    score += pointsTable[tetris.length]
    scoreBoard.textContent = score.toString().padStart(5,'0')

    return surface;
}

window.addEventListener('keydown',((evt) =>{

    switch (evt.key) {

        case 'ArrowUp':
            block.rotate()
            break;
        
        case 'ArrowDown':
            while( (Math.max(...block.coord.map(elm => elm.y)) != (mainCanvas.height - unit)) && (!collision(block,surface))) {                
                block.update();                
            }
            
            break;
        
        case 'ArrowRight':
            block.shift('Right')
            break;

        case 'ArrowLeft':
            block.shift('Left')
            break;

    }
}))

function gameOver(){
    if(Math.min(...surface.map(elm => elm.y)) <= 0){
        nbCtx.clearRect(0 , 0, nextBlockCanvas.width, nextBlockCanvas.height);            
        ctx.clearRect(0 , 0, mainCanvas.width, mainCanvas.height)
        ctx.font = "30px Arial"
        ctx.fillText('GAME OVER', 10, 200)
        return true;
    }
    
    return false;
}
