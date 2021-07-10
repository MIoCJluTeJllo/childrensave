class Egg {
    constructor(x, y, w, h, img){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
    }
    draw = () => ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    fallAnimation = (height, speed, callback) => {
        if (this.y + this.h >= height) {
            callback()
        } else {
            this.y += speed;
        }
        this.draw();
    }
}