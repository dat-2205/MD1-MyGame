class Brick{
    x;
    y;
    width;
    height;
    margin;
    hard;
    isBroke;
    constructor(x,y,hard) {
        this.x = x;
        this.y = y;
        this.width = brickWidth;
        this.height = brickHeight;
        this.margin = brickMargin;
        this.hard = hard;
        this.isBroke = false;
    }
    drawBrick(x){
        ctx.beginPath();
        ctx.fillStyle = x
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.closePath();
    }
}