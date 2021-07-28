class Brick{
    x;
    y;
    width;
    height;
    margin;
    hard;
    isBroke;
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = brickWidth;
        this.height = brickHeight;
        this.margin = brickMargin;
        this.hard = 3;
        this.isBroke = false;
    }
    drawBrick(x){
        ctx.beginPath();
        ctx.fillStyle = x
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.closePath();
    }
}