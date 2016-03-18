"use strict";
import CanvasClass from "./canvas/canvas-class.js";
import EventManagerClass from "./event/event-manager-class.js";
import ImageClass from "./image/image-class.js";
import TextureClass from "./image/texture-class.js";
import AnimationClass from "./animation/animation-class.js";

let image = new ImageClass({
    image: 'image_icon.png',
    position: {x:0, y: 100},
    animation: [
        {
            time: 3000,
            x: {from: 0, to: 436},
            rotate: {
                from: 0, to: 360,
                x: 32, y: 32,
                //easing: 'cosLoop'
            },
            onFinish: 'addToEnd'
        },
        {
            time: 3000,
            x: {from: 436, to: 0},
            rotate: {
                from: 0, to: 360,
                x: 32, y: 32,
                //easing: 'cosLoop'
            },
            onFinish: 'addToEnd'
        }
    ]
});

let sprite = new ImageClass({
    image: 'image_sprite.png',
    width: 64,
    height: 64,
    sprites: {
        speed: 500,
        count: 8,
        grid: {x: 8, y: 1}
    },
    position: {x: 200, y: 200}
});

let explosion = new ImageClass({
    image: 'image_explosion.png',
    position: {x: 200, y: 100},
    width: 100,
    height: 100,
    sprites: {
        speed: 1500,
        count: 74,
        grid: {x: 9, y: 9},
        easing: 'easeOutExpo'
    },
    animation: [{
        time: 1500,
        loops: Infinity,
        opacity: {from: 1, to: 0},
        easing: 'easeOutQuint'
    }]
});

let canvas2 = new CanvasClass({width: 64, height: 64});
canvas2.addItem(sprite);


let canvas = new CanvasClass({width: 500, height: 500});
canvas.addItem(image);
canvas.addItem(sprite);
canvas.addItem(explosion);
canvas.addItem(canvas2);
canvas.show('canvas');

(new EventManagerClass()).requestAnimationFrame(function(time){
    canvas.render(null, time);
});
