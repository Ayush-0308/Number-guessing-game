let randomnumber=(parseInt(Math.random()*100+1))
const submit=document.querySelector('#subt')
const userInput=document.querySelector('#guessField')
const guessSlot=document.querySelector('.guesses')
const remaining=document.querySelector('.lastResult')
const lowOrHi=document.querySelector('.lowOrHi')
const startOver=document.querySelector('.resultParas')

const p=document.createElement('p');
let prevGuess=[]
let numGuess=1
let playguess=true
if(playguess){
    submit.addEventListener('click',(e)=>{
        e.preventDefault()
        const guess=parseInt(userInput.value)
        console.log(guess);
        validateGuess(guess)
    })
}

function validateGuess(guess) {
    if(isNaN(guess)||guess<1||guess===''){
       alert("Please enter a valid number")
    }else if(guess>100){
        alert("please enter a number less than 100")
    }else{
        //prevGuess.push(guess)
        if(numGuess>10){
            cleanupGuess(guess)
            displayMessage(`Game over. Random number was ${randomnumber}`)
            endGame()
        }else{
            cleanupGuess(guess)
            checkGuess(guess)
        }
        
    }
}

function checkGuess(guess) {
    if (guess===randomnumber) {
        displayMessage('you guessed it right')
        endGame()
    }else if(guess<randomnumber){
        displayMessage(`number is too low`)
    }else if(guess>randomnumber){
        displayMessage(`number is too high`)
    }
}

function cleanupGuess(guess){
    userInput.value=''
    guessSlot.innerHTML+=`${guess} , `
    numGuess++
    remaining.innerHTML=`${ 11 -numGuess}`
}

function displayMessage(message) {
    lowOrHi.innerHTML=`<h2>${message}</h2>`
}

function newGame(){
    const newButton=document.querySelector('#newGame')
    newButton.addEventListener('click',(e)=>{
        e.preventDefault()
        randomnumber=(parseInt(Math.random()*100+1))
        numGuess=1
        guessSlot.innerHTML=''
        userInput.removeAttribute('disabled','')
        remaining.innerHTML+=`${11 - numGuess}`
        startOver.removeChild(p)
        playguess=true

    })
}

function endGame(){
    userInput.value=''
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML=`<h2 id="newGame">Start new game</h2>`
    startOver.appendChild(p)
    playguess=false
    newGame()
}


