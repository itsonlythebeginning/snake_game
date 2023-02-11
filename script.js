let canvas = document.querySelector('canvas');
let ctx    = canvas.getContext('2d');
let intID

let res_h_one = document.querySelector(".res_h_one")

let direction


let ceil = 20

let headX = canvas.width / 2
let headY = canvas.height / 2

let snakeTail = 0

let snakeArr = []

let chechArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]



let AppleX = getRndInteger(0, 19) * ceil
let AppleY = getRndInteger(0, 19) * ceil

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}





function drawSnake() {

    ctx.fillStyle = "red"
    ctx.fillRect(headX,headY, ceil-1, ceil-1)

    ctx.fillStyle = "blue"

    for (let i = 0; i < snakeTail; i++) {
        ctx.fillRect(snakeArr[i][0],snakeArr[i][1], ceil-1, ceil-1)
    }

}


function drawApple() {
    ctx.fillStyle = "green"
    ctx.fillRect(AppleX,AppleY, ceil-1, ceil-1)
}



function clearScreen() {
    ctx.fillStyle = "#E5E5E5"
    ctx.fillRect(0,0, canvas.width, canvas.height)
}


function saveLastPos() {
    snakeArr.length = snakeTail
    let arr = []
    arr.push(headX)
    arr.push(headY)
    snakeArr.unshift(arr)
}



function goRight() {
    direction = "right"
    clearScreen()
    saveLastPos()
    headX = headX + ceil
    drawSnake()
}

function goLeft() {
    direction = "left"
    clearScreen()
    saveLastPos()
    headX = headX - ceil
    drawSnake()
}

function goUp() {
    direction = "up"
    clearScreen()
    saveLastPos()
    headY = headY - ceil
    drawSnake()
}

function goDown() {
    direction = "down"
    clearScreen()
    saveLastPos()
    headY = headY + ceil
    drawSnake()
}




function changeSnakePos(event) {

                clearInterval(intID)

                intID = setInterval(function () {
                    if (event.keyCode == 37) {
                        if (direction === "right") {
                            goRight()
                        }
                        else{
                            goLeft()
                        }
                    }
                    if (event.keyCode == 38) {
                        if (direction === "down") {
                            goDown()
                        }
                        else{
                            goUp()
                        }
                    }
                    if (event.keyCode == 39) {
                        if (direction === "left") {
                            goLeft()
                        }
                        else{
                            goRight()
                        }
                    }
                    if (event.keyCode == 40) {
                        if (direction === "up") {
                            goUp()
                        }
                        else{
                            goDown()
                        }

                    }
                    drawApple()
                    checkEatApple()
                    checkIsSnakeDeath()
                    checkIsSnakeDeathTwo()
                }, 130)

}



function checkEatApple() {

    if (headX == AppleX && headY == AppleY) {

        snakeTail++
        res_h_one.textContent = `Результат: ${snakeTail}`
        AppleX = getRndInteger(0, 19) * ceil
        AppleY = getRndInteger(0, 19) * ceil
        clearScreen()
        drawSnake()
        drawApple()

    }

}



function deadSnake() {

    clearScreen()
    AppleX = getRndInteger(0, 19) * ceil
    AppleY = getRndInteger(0, 19) * ceil
    headX = canvas.width / 2
    headY = canvas.height / 2
    snakeTail = 0
    snakeArr = []
    direction = ""
    drawSnake()
    drawApple()
    clearInterval(intID)
    res_h_one.textContent = `Результат: ${snakeTail}`
}



function checkIsSnakeDeath() {

    for (let i = 0; i < snakeArr.length; i++) {

        if (snakeArr[i][0] == headX && snakeArr[i][1] == headY ) {
            deadSnake()
        }

    }

}



function checkIsSnakeDeathTwo() {

    for (let i = 0; i < chechArray.length; i++) {

        if ((chechArray[i] * ceil) == headX &&(-ceil) == headY ) {
            deadSnake()
        }
        else if (  headX == -ceil && (ceil * chechArray[i]) == headY        ) {
            deadSnake()
        }

        else if (  (chechArray[i] * ceil == headX) && (canvas.height) == headY        ) {
            deadSnake()
        }

        else if (  (canvas.width == headX) && (chechArray[i] * ceil) == headY        ) {
            deadSnake()
        }

    }

}


drawSnake()
drawApple()


document.body.addEventListener("keyup", changeSnakePos)

