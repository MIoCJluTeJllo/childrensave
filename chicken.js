class Chicken {
    constructor(x, y, w, h, img){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.direction = 0;
        this.img = img;
        this.speed = 10;
    }
    collision = (obj, callback) => {
        if ((obj.x + obj.w >= this.x) && 
            (obj.x <= this.x + this.w) && 
            (obj.y + obj.h >= this.y) && 
            (obj.y <= this.y + this.h)){
            callback();
        }
    }
    draw = () => ctx.drawImage(this.img, this.x, this.y, this.w, this.h); 
    rigth = (max) => {
        if (this.x + this.w < max) {
            this.x += this.speed;
        }
    }
    left = () => {
        if (this.x > 0) {
            this.x -= this.speed;
        }
    }
}
