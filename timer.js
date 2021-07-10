class Timer{
    constructor(){
        this.last = 0;
    }
    run = (now, sec, callback) => {
        if (!this.last || now - this.last >=sec*1000) {
            callback();
            this.last = now;
        }
    }
}