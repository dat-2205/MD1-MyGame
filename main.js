let canvas = document.getElementById("play1")
let ctx = canvas.getContext("2d")

// ctx.beginPath();
// ctx.drawElements()

let bgImg = new Image()
bgImg.src = "img/backgrond.jpg"
let bounceSound = new Audio()
bounceSound.src = "sound/bounce.wav"
let backGroundMusic = new Audio()
backGroundMusic.src = "sound/music.mp3"
let bonusSound = new Audio()
bonusSound.src = "sound/bonus.wav"
let winGame = new Audio()
winGame.src = "sound/win.wav"
let loseGame = new Audio()
loseGame.src = "sound/losegame.wav"
let paddleSpeed = 10;
let isMoveL = false;
let isMoveR = false;

let dx = 7;
let dy = 2;
let flag = false;

let isGameOver = false;
let isGameWin = false;
let isStartGame = false;
let isDown = false;

let ballColor = ["#FF33FF","#CC33FF","#006666"]

let brickWidth = 130;
let brickHeight = 30;
let brickMargin = 25;
let brickRow = 4;
let brickCol = 5;
let brickList = [];
let point = 0;
let brickColor = ["#00FFFF","#0000FF","#000080","#003333"]

let bonusShowUp = false;
let isBonus = false;
let bonusCount = 0;

let p = new pad(paddleSpeed)
let b = new ball()
let bonus = new Bonus(135,400,1)



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
        bonusShow()
        movePaddle()
        paddleGetBonus()
        checkGameOver()
        b.x+= b.speedX;
        b.y+= b.speedY;
        requestAnimationFrame(drawCanvas)
    }else if(isGameWin){
        backGroundMusic.pause()
        winGame.play()
        document.getElementById("point").innerHTML = "You Win!"
    }
    else {
        backGroundMusic.pause()
        loseGame.play()
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
    if(b.x>=p.x-b.radius && b.x<= p.x+p.width+b.radius && b.y >= p.y-b.radius && b.y<p.y+p.height-b.radius ){
        if(b.x==p.x-b.radius || b.x==p.x+p.width+b.radius){
            b.speedX= -b.speedX
        }
        b.speedY = -b.speedY
        isDown = false;
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
            let brick = new Brick(brickMargin+(j*(brickMargin+brickWidth)), brickMargin+(i*(brickMargin+brickHeight)),Math.abs(-(brickColor.length)+i))
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
                bounceSound.play();
                if(b.x==a.x+a.width+b.radius || b.x==a.x-b.radius){
                    b.speedX = -b.speedX
                }
                if(a.hard>=b.damage){
                    b.speedY = -b.speedY
                    isDown = true;
                }
                flag = !flag
                a.hard -= b.damage;
                if(a.hard < 1){
                    a.isBroke = true;
                }
                if(point<brickList.length&& a.isBroke==true){
                    point++;
                    speedUp()
                    showPoint()
                    checkBonusShowUp(a)
                }
            }
        }
    })
}
function showPoint(){
    document.getElementById("point").innerHTML = "Your point:  " + point;
}
function speedUp(){
    if(point%3==0 && isDown==true){
        b.speedY +=2;
        console.log(b.speedY)
    }
}
function checkBonusShowUp(a){
    if(point%bonus.showUp==0){
        bonus.x = a.x+a.width/2;
        bonus.y = a.y+a.height;
        bonusShowUp = true;
    }
}
function bonusShow(){
    if(bonusShowUp==true && bonusCount<=2){
        bonus.drawBonus()
        bonus.y +=1;
    }
}

function paddleGetBonus(){
    if(bonus.x>=p.x-bonus.radius && bonus.x<=p.x+p.width+bonus.radius && bonus.y==p.y-bonus.radius ){
        bonusSound.play()
        bonus.y+=30;
        bonusShowUp=false;
        isBonus = true;
        bonusCount ++;
        damagePlus();
        b.color = ballColor[b.damage-2]
    }
}
function damagePlus(){
    if(isBonus){
        b.damage += bonus.dmgPlus;
        console.log(b.damage)
        isBonus = !isBonus;
    }
}


function playButton(top, left, width, height, lWidth, fillColor, lineColor) {
    ctx.beginPath();
    ctx.rect(300, 350, 200, 100);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillStyle = 'rgba(225,225,225,0.5)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.closePath();
    ctx.font = '40pt Kremlin Pro Web';
    ctx.fillStyle = '#000000';
    ctx.fillText('Start', 345, 415);
    // canvas.addEventListener('click',
    // )
}
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}
function startHandle(){
    let rect = {
        x:250,
        y:350,
        width:200,
        height:100
    };
    canvas.addEventListener('click', function(evt) {
        let mousePos = getMousePos(canvas, evt);

        if (isInside(mousePos,rect) && isStartGame==false) {
            drawCanvas()
            backGroundMusic.play()
            isStartGame = true;
        }
    }, false);
}

function begin(){
    drawBG()
    initMutiBrick()
    drawMutiBrick()
    p.drawPad()
    b.drawBall()
    playButton()
    startHandle()
}


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



