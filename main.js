let canvas = document.getElementById("play1")
let ctx = canvas.getContext("2d")
let bgImg = new Image()
bgImg.src = "img/backgrond.jpg"

let paddleSpeed = 10;
let isMoveL = false;
let isMoveR = false;

let dx = 7;
let dy = 2;
let flag = false;

let isGameOver = false;
let isGameWin = false;


let brickWidth = 130;
let brickHeight = 30;
let brickMargin = 25;
let brickRow = 1;
let brickCol = 2;
let brickList = [];
let point = 0;
let brickColor = ["#00FFFF","#0000FF","#000080"]

let p = new pad(paddleSpeed)
let b = new ball()




function drawCanvas(){
    if(!isGameOver && !isGameWin){
        clearCanvas()
        drawBG()
        p.drawPad()
        b.drawBall()
        // checkLevel()
        checkIsBrokeBrick()
        drawMutiBrick()
        toBorder()
        bounce()
        movePaddle()
        checkGameOver()
        b.x+= b.speedX;
        b.y+= b.speedY;
        requestAnimationFrame(drawCanvas)
    }else if(isGameWin){
        alert("You Win!")
    }
    else {
        alert("You Lose!")
    }

}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
function drawBG(){
    ctx.beginPath()
    ctx.drawImage(bgImg,0,0,800,700)
    ctx.closePath()
}

function toBorder(){
    if(b.x < b.radius || b.x >= canvas.width - b.radius){
        b.speedX = -b.speedX
    }
    if(b.y<b.radius){
        b.speedY = -b.speedY
    }
}
function bounce(){
    if(b.x+b.radius>=p.x && b.x+b.radius <= p.x+p.width && b.y >= p.y-b.radius && b.y<p.y+p.height-b.radius ){
        b.speedY = -b.speedY
    }
}
function movePaddle(){
    if(isMoveL){
        p.moveLeft()
    }else if(isMoveR){
        p.moveRight()
    }
}

function checkGameOver(){
    if(point == brickList.length ){
        isGameWin =true
    }
    if(b.y>canvas.height-b.radius){
        isGameOver=true
    }
}
function initMutiBrick(){
    for(let i=0;i<brickRow;i++){
        for(let j=0;j<brickCol;j++){
            let brick = new Brick(brickMargin+(j*(brickMargin+brickWidth)), brickMargin+(i*(brickMargin+brickHeight)))
            brickList.push(brick)
        }
    }
}
function drawMutiBrick(){
    brickList.forEach(function (b){
        if(!b.isBroke){
            b.drawBrick(brickColor[b.hard-1]);
        }
    })
}

function checkIsBrokeBrick(){
    brickList.forEach(function (a){
        if(!a.isBroke){
            if(b.x>=a.x-b.radius && b.x<=a.x+a.width+b.radius && b.y>=a.y-b.radius && b.y<=a.y+a.height+b.radius){
                if(b.x==a.x+a.width+b.radius || b.x==a.x-b.radius){
                    b.speedX = -b.speedX
                }
                b.speedY = -b.speedY
                flag = !flag
                if(a.hard ==1){
                    a.isBroke = true;
                }
                a.hard--;
                if(point<brickList.length&& a.isBroke==true){
                    point++;
                }
            }
        }
    })
}

drawBG()
initMutiBrick()
drawMutiBrick()
p.drawPad()
b.drawBall()

window.addEventListener("keydown",function (){
    switch (event.keyCode){
        case 37:
            isMoveL=true;
            break;
        case 39:
            isMoveR=true;
            break;
    }
})
window.addEventListener("keyup",function (){
    switch (event.keyCode){
        case 37:
            isMoveL=false;
            break;
        case 39:
            isMoveR=false;
            break;
    }
})
