class ball{
    x;
    y;
    radius;
    speedX;
    speedY;
    constructor() {
        this.radius = 20
        this.speedX = dx;
        this.speedY = dy;
        this.x = canvas.width/2
        this.y = canvas.height - this.radius - 20
    }
    drawBall(){
        ctx.beginPath()
        ctx.fillStyle = "#bd081c"
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
        ctx.fill()
        ctx.closePath()
    }
}
