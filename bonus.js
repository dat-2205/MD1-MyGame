class Bonus{
    x;
    y;
    radius;
    dmgPlus;
    showUp;
    constructor(x,y,dmgPlus) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.dmgPlus = dmgPlus;
        this.showUp = 4;
    }
    drawBonus(){
        ctx.beginPath();
        ctx.fillStyle = "#FFFF00"
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill();
        ctx.closePath()
    }

}