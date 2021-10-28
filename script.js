document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')

    const pages = document.querySelectorAll('.page')
const chooseAnimalBtns = document.querySelectorAll('.choose-animal-btn')
const startBtn = document.getElementById('start-btn')

let selectedAnimals = {}

startBtn.addEventListener('click', () => {
    pages[0].classList.add('up')
    startGame()
})


chooseAnimalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selectedAnimals = {src, alt}
        pages[1].classList.add('up')
        
        

    })
})

    const width = 8
    const squares = []
    let score = 0

    const dogs = [
        'url(dogs/dog1.png)',
        'url(dogs/dog4.jpg)',
        'url(dogs/dog5.png)',
        'url(dogs/dog6.jpg)',
        'url(dogs/dog7.png)',
        'url(dogs/dog8.png)',
    ]

const createBoard = () => {
    for(let i = 0; i <width*width; i++){
        const square = document.createElement('div')
        square.setAttribute('draggable', 'true')
        let randomAnimal = Math.floor(Math.random() * dogs.length)
        square.setAttribute('id', i)
        square.style.backgroundImage = dogs[randomAnimal]
        grid.appendChild(square)
        squares.push(square)

    }
}
createBoard()

    
    let animalBeingDragged
    let animalBeingReplaced
    let squareBeingDragged
    let squareBeingReplaced


squares.forEach(sqaure => sqaure.addEventListener('dragstart', dragStart))
squares.forEach(sqaure => sqaure.addEventListener('dragend', dragEnd))
squares.forEach(sqaure => sqaure.addEventListener('dragover', dragOver))
squares.forEach(sqaure => sqaure.addEventListener('dragenter', dragEnter))
squares.forEach(sqaure => sqaure.addEventListener('dragleave', dragLeave))
squares.forEach(sqaure => sqaure.addEventListener('drop', dragDrop))

function dragStart() {
animalBeingDragged = this.style.backgroundImage
squareBeingDragged = parseInt(this.id)
}
function dragEnd() {

    //what is a valid move

    let validMoves = [
        squareBeingDragged - 1,
        squareBeingDragged - width,
        squareBeingDragged + 1,
        squareBeingDragged + width
    ]
    let validMove = validMoves.includes(squareBeingReplaced)
    if(squareBeingReplaced && validMove){
        squareBeingReplaced = null
    }else if (squareBeingReplaced && !validMove){
        squares[squareBeingReplaced].style.backgroundImage = animalBeingReplaced
        squares[squareBeingDragged].style.backgroundImage = animalBeingDragged

    }else {
        squares[squareBeingDragged].style.backgroundImage = animalBeingDragged

    }
}
function dragOver(e) {
e.preventDefault()
}
function dragEnter(e) {
e.preventDefault()

}
function dragLeave() {

}
function dragDrop() {

    animalBeingReplaced = this.style.backgroundImage
    squareBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = animalBeingDragged
    squares[squareBeingDragged].style.backgroundImage = animalBeingReplaced

}

function moveIntoSquareBelow(){
    for(let i = 0; i<= 55; i++){
        if(squares[i + width].style.backgroundImage === ''){
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)
            if(isFirstRow && (squares[i].style.backgroundImage === '')){
                let random = Math.floor(Math.random() * dogs.length)
                squares[i].style.backgroundImage = dogs[random]
            }
        }
    }
}
//cheking four
function checkColumnForFour(){
    for(let i = 0; i <= 39; i++){
        let columnOfFour = [i, i + width, i + width*2, i + width * 3]
        let decidedAnimal = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedAnimal && !isBlank)){
          score += 4
        scoreDisplay.innerHTML = score
        columnOfFour.forEach(index => {
            squares[index].style.backgroundImage = ''
        })   
        }
       
    }
}
checkColumnForFour()
function checkRowForFour() {
    for(let i = 0; i < 60; i++){
        let rowOfFour = [i, i + 1, i + 2, i + 3]
        let decidedAnimal = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        
        const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
        if(notValid.includes(i)) continue

        if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedAnimal && !isBlank)){
            score +=4
            scoreDisplay.innerHTML = score
            rowOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkRowForFour()


///checking three
function checkRowForThree() {
    for(let i = 0; i < 61; i++){
        let rowOfThree = [i, i + 1, i + 2]
        let decidedAnimal = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        
        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
        if(notValid.includes(i)) continue

        if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedAnimal && !isBlank)){
            score +=3
            scoreDisplay.innerHTML = score
            rowOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkRowForThree()


function checkColumnForThree(){
    for(let i = 0; i <= 47; i++){
        let columnOfThree = [i, i + width, i + width*2]
        let decidedAnimal = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedAnimal && !isBlank)){
          score += 3
        scoreDisplay.innerHTML = score
        columnOfThree.forEach(index => {
            squares[index].style.backgroundImage = ''
        })   
        }
       
    }
}
checkColumnForThree()
//time
const timeEl = document.getElementById('time')
let seconds = 0
function increaseTime(){
    let m = parseInt(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++

}
function startGame(){
setInterval(increaseTime, 1000)


}





const message = document.getElementById('message')
function displayMessage(){

   
     if(score > 25 && score < 32){
         message.classList.add('visible')
         
         message.innerText = `Your score is ${score}! Keep up!`
     }else{
       message.classList.remove('visible')
      

     }

     if(score >80 && score < 88){
         message.classList.add('visible')
         message.innerText = `Woof woof your score is ${score} now!`
     }

     
     if(score >150 && score < 158){
         message.classList.add('visible')
         message.innerText = `Wow just keep up! You are doing great! ${score}`
     }
 
   

}








 window.setInterval(function(){
checkRowForFour()
checkColumnForFour()
checkRowForThree()
checkColumnForThree()
moveIntoSquareBelow()
displayMessage()


},100)




})





