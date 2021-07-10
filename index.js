const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

preloadImages(paths, (images)=>{
    //CREATE OBJ
    //chicken
    chicken_size = {w: 120, h: 140}
    chicken = new Chicken(
        canvas.width/2, 
        canvas.height - chicken_size.h - 50,
        chicken_size.w, chicken_size.h,
        images.chicken_default);
    //egg
    const eggs = [];
    const crash_eggs = [];
    const createEgg = () => {
        let w = 35;
        let h = 45;
        let x = Math.random() * (canvas.width - w * 2) + w;
        let y = 0;
        eggs.push(new Egg(x, y, w, h, images.egg));
    }
    //create timers
    const chicken_move_timer = new Timer();
    const egg_fall_timer = new Timer();
    const speed_up_timer = new Timer();
    let step_counter = 0;
    let fail = 0;
    let score = 0;
    let win_game = false;
    let lose_game = false;
    function MainCycle(now) {
        //clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //anim chicken
        switch(chicken.direction){
            case 0: {
                step_counter=0;
                chicken.img = images.chicken_default;
                break;
            }
            case -1: {
                chicken.left();
                chicken_move_timer.run(now, 0.1, ()=>{
                    step_counter++;
                    chicken.img = images[`chicken_left_${step_counter}`];
                    if (step_counter == 5){
                        step_counter = 1;
                    }
                })
                break;
            }
            case 1: {
                chicken.rigth(canvas.width);
                chicken_move_timer.run(now, 0.1, ()=>{
                    step_counter++;
                    chicken.img = images[`chicken_rigth_${step_counter}`];
                    if (step_counter == 5){
                        step_counter = 1;
                    }
                })
                break;
            }
        }
        chicken.draw();

        //speed up
        speed_up_timer.run(now, fall.speed_period, ()=>{
            chicken.speed++;
            fall.speed++;
        })
        //create egg   
        egg_fall_timer.run(now, fall.frequency, ()=>{
            createEgg();
        });
        
        //anim egg
        for (let i = 0; i < eggs.length; i++) {
            let egg = eggs[i];
            chicken.collision(egg, ()=>{
                catch_audio.play();
                eggs.splice(i, 1);
                score++;
                if (score == point.win){
                    win_game = true;
                    gameOver = true;
                }
            });
            egg.fallAnimation(canvas.height, fall.speed, () => {
                egg_crash_audio.play();
                egg.img = images.egg_crash;
                eggs.splice(i, 1);
                crash_eggs.push(egg);
                fail++;
                if (fail == point.loss){
                    lose_game = true;
                    gameOver = true;
                }
            });
        }    
        for (let i = 0; i < crash_eggs.length; i++) {
            let egg = crash_eggs[i];
            egg.w = 55;
            egg.h = 45;
            egg.draw();
        }
        for (let i = 0; i < point.loss; i++){
            const w = 40;
            const h = 60;
            const left = 10;
            if (i >= crash_eggs.length){
                ctx.drawImage(images.egg_progress, (w+left)*i, 0, w, h);
            }else {
                ctx.drawImage(images.egg_crush_progress, (w+left)*i, 0, w, h);
            }
        }
        //update score
        drawText(score, canvas.width-60-50, 55, '48px serif', true);
        ctx.drawImage(images.basket, canvas.width-80, 0, 70, 70);
        if (win_game){
            ctx.drawImage(images.win, 0, 0, canvas.width, canvas.height);
        }
        else if (lose_game){
            ctx.drawImage(images.lose, 0, 0, canvas.width, canvas.height);
        }
        if (!gameOver){
            requestAnimationFrame(MainCycle);
        }
    }
    //run cycle
    requestAnimationFrame(MainCycle);
});

//EVENTS
//resize
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
//mouse
window.onkeydown = (e) => {
    var code = e.keyCode;
    switch (code) {
        case 37: {
            chicken.direction = -1;
            break;
        }
        case 39: {
            chicken.direction = 1;
            break;
        }
    }
}
window.onkeyup = (e) => {
    var code = e.keyCode;
    switch (code) {
        case 37: {
            chicken.direction = 0;
            break;
        }
        case 39: {
            chicken.direction = 0;
            break;
        }
    }
}