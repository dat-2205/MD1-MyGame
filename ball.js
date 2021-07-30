class ball{
    x;
    y;
    radius;
    color;
    speedX;
    speedY;
    damage;
    constructor() {
        this.radius = 20
        this.speedX = dx;
        this.speedY = dy;
        this.color = "#bd081c";
        this.x = canvas.width/2
        this.y = canvas.height - this.radius - 20
        this.damage = 1;
    }
    drawBall(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
        ctx.fill()
        ctx.closePath()
    }
}
