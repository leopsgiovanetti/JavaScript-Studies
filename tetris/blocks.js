class Block{
    constructor(shapeCode){
        this.shapeCode = shapeCode;        
        this.ySpeed = unit;
        this.coord = [];
        this.x = 2 * unit;
        this.y = 2 * unit;
    }

    update(){

        for(let i = 0; i < 4; i++){
            if((this.coord[i].y + this.ySpeed) > (mainCanvas.height - unit)){
                // console.log('limite pagina')
                this.ySpeed = 0;
            }
        }

        if(collision(this,surface)){
            
            this.ySpeed = 0;
        } 

        this.y += this.ySpeed 
        for(let i = 0; i < 4; i++){
            this.coord[i].y += this.ySpeed; 
        }

        

        // if(this.collision()){
        //     this.ySpeed = 0;
        // }
    }

    shift(direction){
        switch (direction) {
            case 'Right':
                // console.log(Math.max(...this.coord.map(a => a.x)))
                if(Math.max(...this.coord.map(a => a.x)) < mainCanvas.width - unit){
                    this.x += unit;
                    for(let i = 0; i < 4; i++){
                        this.coord[i].x += unit; 
                    }
                }                

                break;

            case 'Left':
                // console.log(Math.min(...this.coord.map(a => a.x)))
                if(Math.min(...this.coord.map(a => a.x)) > 0){
                    
                    this.x -= unit;
                    for(let i = 0; i < 4; i++){
                        this.coord[i].x -= unit; 
                    }
                }
                break;
        }
    }

    initialForm(){
        switch (this.shapeCode) {
            case 1:
                //line
                this.color = "green"
                this.coord.push({x: this.x , y: this.y - unit})
                this.coord.push({x: this.x , y: this.y})
                this.coord.push({x: this.x , y: this.y + unit})
                this.coord.push({x: this.x , y: this.y + 2 * unit})


                break;
            case 2:
                //L
                this.color = "blue"
                this.coord.push({x: this.x , y: this.y - unit})
                this.coord.push({x: this.x , y: this.y})
                this.coord.push({x: this.x , y: this.y + unit})
                this.coord.push({x: this.x + unit , y: this.y + unit})


                break;
            case 3:
                //reverse L
                this.color = "blue"
                this.coord.push({x: this.x , y: this.y - unit})
                this.coord.push({x: this.x , y: this.y})
                this.coord.push({x: this.x , y: this.y + unit})
                this.coord.push({x: this.x - unit , y: this.y + unit})

                break;
            case 4:
                //block
                this.color = "red"
                this.coord.push({x: this.x , y: this.y - unit})
                this.coord.push({x: this.x , y: this.y})
                this.coord.push({x: this.x + unit , y: this.y - unit})
                this.coord.push({x: this.x + unit , y: this.y})

                break;
            case 5:
                //pike
                this.color = "orange"
                this.coord.push({x: this.x , y: this.y - unit})
                this.coord.push({x: this.x , y: this.y})
                this.coord.push({x: this.x , y: this.y + unit})
                this.coord.push({x: this.x + unit , y: this.y})

                break;
            case 6:
                //Z
                this.color = "yellow"
                this.coord.push({x: this.x - unit , y: this.y})
                this.coord.push({x: this.x , y: this.y})
                this.coord.push({x: this.x , y: this.y + unit})
                this.coord.push({x: this.x + unit , y: this.y + unit})

                break;
            case 7:
                //S
                this.color = "yellow"
                this.coord.push({x: this.x + unit , y: this.y})
                this.coord.push({x: this.x , y: this.y})
                this.coord.push({x: this.x , y: this.y + unit})
                this.coord.push({x: this.x - unit , y: this.y + unit})

                break;
        }
    }

    rotate(){
        let newCoord = []
        
        
        for(let i = 0; i < 4; i ++){
            let xHelper = this.coord[i].x
            let yHelper = this.coord[i].y
            
            newCoord.push({ x: (yHelper - this.coord[1].y) + this.coord[1].x ,
                            y: (this.coord[1].x - xHelper) + this.coord[1].y})

        }
        while(Math.min(...newCoord.map(a => a.x)) < 0){
            this.x += unit;
            newCoord.forEach(a => a.x += unit )
        }
        while(Math.max(...newCoord.map(a => a.x)) > mainCanvas.width - unit){
            this.x -= unit;
            newCoord.forEach(a => a.x -= unit )
        }
        this.coord = newCoord;

    }

    draw(){

        for(let i = 0; i < 4; i++){
            ctx.fillRect(this.coord[i].x, this.coord[i].y, unit, unit)
        }
    }

    drawNext(){
        for(let i = 0; i < 4; i++){
            nbCtx.fillRect(this.coord[i].x, this.coord[i].y, unit, unit)
        }
    }

    fall(){
        this.x = Math.round(Math.random()* 6 + 2) * unit;
        this.y = 0;
        this.initialForm()
    }


}

function collision(block, surface){

    for(let i = 0; i < block.coord.length ; i++){
        for(let j = 0; j < surface.length; j++){ //tá horrivel isso! pensar em solução melhor
            if(block.coord[i].x === surface[j].x && block.coord[i].y === surface[j].y - unit){
                // console.log(`collision at ${i}: ${block.coord[i].x}  and ${j}: ${block.coord[i].y}, ${surface[j].y - unit} `)
                
                return true;
                        
            }
        }        
    }
    return false
}


function callNextBlock(block,nextBlock){
    block = new Block(nextBlock.shapeCode)
    block.initialForm()   
    
    nextBlock = new Block(Math.floor(Math.random()*7)+1);
    nextBlock.initialForm();
    
    nbCtx.clearRect(0 , 0, nextBlockCanvas.width, nextBlockCanvas.height);
    nextBlock.drawNext();
}