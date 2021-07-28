class pad {
    width;
    height;
    speed;
    x;
    y;
    constructor(speed){
        this.width = 200;
        this.height = 20;
        this.x = canvas.width/2-this.width/2 ;
        this.y = canvas.height-this.height;
        this.speed = speed;
    }
    drawPad(){
        ctx.beginPath()
        ctx.fillStyle = "#FFF"
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath()
    }
    moveRight(){
        if(this.x<800-this.width){
            this.x+=this.speed;
        }
    }
    moveLeft(){
        if(this.x>0){
            this.x-=this.speed;
        }
    }

}


