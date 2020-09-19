document.addEventListener('DOMContentLoaded', () => {

    //create cards ass array of objects (name and image)
    const animals = [
        {
            name: 'toucan',
            img: 'images/toucan.png'
        },
        {
            name: 'bear',
            img: 'images/bear.png'
        },
        {
            name: 'cat',
            img: 'images/cat.png'
        },
        {
            name: 'dog',
            img: 'images/dog.png'
        },
        {
            name: 'elephant',
            img: 'images/elephant.png'
        },
        {
            name: 'cow',
            img: 'images/cow.png'
        },
        {
            name: 'giraffe',
            img: 'images/giraffe.png'
        },
        {
            name: 'fish',
            img: 'images/fish.png'
        },
        {
            name: 'pig',
            img: 'images/pig.png'
        },
        {
            name: 'rabbit',
            img: 'images/rabbit.png'
        },
        {
            name: 'lion',
            img: 'images/lion.png'
        },
        {
            name: 'octopus',
            img: 'images/octopus.png'
        },
        {
            name: 'sheep',
            img: 'images/sheep.png'
        },
        {
            name: 'zebra',
            img: 'images/zebra.png'
        }
    ]


const grid = document.querySelector('.grid')
let cardsChosen = [];
let cardsChosenID = [];
let cardsWon = [];
let cardsArray = [];
let scores = [];
let currentPlayer;

const button = document.getElementById('start')
button.addEventListener('click', loadGame)

function loadGame() {
    // options variables
    const levelopt = document.getElementsByName('level')
    let checkLevel;
    for(let i = 0; i < levelopt.length; i++){
        if(levelopt[i].checked){
            checkLevel = levelopt[i].value
        }

    }
    const level = parseInt(checkLevel)
    const players = parseInt(document.getElementById('players').value)
    const scoreboard = document.getElementById('scoreboard')
    for (let i = 0; i < players ; i++){
        let newPlayer = document.createElement('h4')
        newPlayer.textContent = 'Player ' + (i + 1) + ':   '
        newPlayer.setAttribute('id', 'player' + i)
        let newScore = document.createElement('span')
        newScore.setAttribute('class', 'score')
        newScore.setAttribute('id', 'score' + i)
        scoreboard.appendChild(newPlayer)
        newPlayer.appendChild(newScore)
        scores[i] = 0;
    }
    currentPlayer = 0;
    let activePlayer = document.getElementById('player' + currentPlayer)
    activePlayer.setAttribute('class','currentPlayer')
    for(let i = 0; i < scores.length; i++){
        let scoreCurrentPlayer = document.getElementById('score'+i)
        scoreCurrentPlayer.textContent = scores[i]
    }
    // unable options
    const opt = document.querySelectorAll('.options')
    opt.forEach(elm => elm.setAttribute('disabled', 'true'))    
        
    let counter = 0
    for (let i = 0; i < level*2; i+=2){        
        cardsArray[i] = animals[counter]
        cardsArray[i + 1] = animals[counter]
        counter ++;
    }
    
    cardsArray.sort(() => 0.5 - Math.random())
    createBoard()
}



function nextTurn(){    
    let activePlayer = document.getElementById('player' + currentPlayer)
    activePlayer.setAttribute('class','')
    console.log(activePlayer)
    if(currentPlayer === scores.length - 1){
        currentPlayer = 0;
    }
    else{
        currentPlayer++;
    }
    activePlayer = document.getElementById('player' + currentPlayer)
    activePlayer.setAttribute('class','currentPlayer')

}

//create board
function createBoard() {
    //loop card array to create an img element
    
    for (let i = 0; i < cardsArray.length; i++){
        let card = document.createElement('img')
        card.setAttribute('src', 'images/back.png')
        card.setAttribute('data-id', i)
        card.setAttribute('width', '100')
        card.setAttribute('height', '100')
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
    }
    
}


//flip cards 
function flipCard() {
    let cardID = this.getAttribute('data-id')
    cardsChosen.push(cardsArray[cardID].name)
    cardsChosenID.push(cardID)
    this.setAttribute('src', cardsArray[cardID].img)
    if (cardsChosen.length === 2){
        setTimeout(checkMatch, 500)
    }
}

//check for match
function checkMatch() {

    let cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenID[0]
    const optionTwoId = cardsChosenID[1]
    if(cardsChosen[0] === cardsChosen[1]){
        //alert("IT'S A MATCH! ")
        cards[optionOneId].setAttribute('src', 'images/done.png')
        cards[optionTwoId].setAttribute('src', 'images/done.png')
        scores[currentPlayer]++;
    }
    else{
        cards[optionOneId].setAttribute('src', 'images/back.png')
        cards[optionTwoId].setAttribute('src', 'images/back.png')
        //alert('Try again')
    }
    cardsChosen = [];
    cardsChosenID = [];
    let highScore = Math.max(...scores)
    let winner = "";
    for(let i = 0; i < scores.length; i++){
        let scoreCurrentPlayer = document.getElementById('score'+i)
        scoreCurrentPlayer.textContent = scores[i]
        if(scores[i] === highScore){
            winner += ('Player' + (i + 1) + " ")
        }
    }
    
    
    if(scores.reduce((a,b) => a + b) === cardsArray.length/2){
        
        alert('Game over! WINNER:' + winner)
    }
    nextTurn()
}


})