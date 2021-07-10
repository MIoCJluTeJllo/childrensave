const PATH = (path) => `assets/${path}`;

const egg_crash_audio = new Audio(PATH('egg_crush.wav'));
const catch_audio = new Audio(PATH('catch.wav'));

const paths = [
    {key: 'chicken_default', path: PATH('default.png')},
    {key: 'chicken_left_1', path: PATH('l1.png')},
    {key: 'chicken_left_2', path: PATH('l2.png')},
    {key: 'chicken_left_3', path: PATH('l3.png')},
    {key: 'chicken_left_4', path: PATH('l4.png')},
    {key: 'chicken_left_5', path: PATH('l5.png')},
    {key: 'chicken_rigth_1', path: PATH('r1.png')},
    {key: 'chicken_rigth_2', path: PATH('r2.png')},
    {key: 'chicken_rigth_3', path: PATH('r3.png')},
    {key: 'chicken_rigth_4', path: PATH('r4.png')},
    {key: 'chicken_rigth_5', path: PATH('r5.png')},
    {key: 'egg', path: PATH('egg.png')},
    {key: 'egg_crash', path: PATH('egg_crash.png')},
    {key: 'egg_crush_progress', path: PATH('egg_crush_progress.svg')},
    {key: 'egg_progress', path: PATH('egg_progress.svg')},
    {key: 'lose', path: PATH('lose.png')},
    {key: 'win', path: PATH('win.png')},
    {key: 'basket', path: PATH('basket.png')},
]

function preloadImages(sources, success) {
    let counter = 0;
    let images = []
    for(let source of sources) {
        let img = new Image();
        img.onload = () => {
            images[source.key] = img;
            counter++;
            if (counter == sources.length) success(images);
        };
        img.src = source.path;
    }
}

