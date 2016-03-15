"use strict";
import CanvasClass from "./canvas/canvas-class.js";
import EventManagerClass from "./event/event-manager-class.js";
import ImageClass from "./image/image-class.js";
import TextureClass from "./image/texture-class.js";
import AnimationClass from "./animation/animation-class.js";

let eventManager = new EventManagerClass();

let animation = new AnimationClass([
    {
        time: 2000,
        x: {from: 0, to: 220},
        y: {from: 0, to: 100},
        opacity: {from: 1, to: 0.1},
        rotate: {from: 0, to: 360, x:32, y:0},
        easing: 'easeInCubic'
    },
    {
        time: 2000,
        x: {value: 220},
        y: {from: 100, to: 220},
        opacity: {from: 0.1, to: 1},
        easing: 'easeOutCubic'
    },
    {
        time: 2000,
        loops: Infinity,
        x: {value: 220},
        y: {value: 220},
        opacity: {from: 0, to: 1},
        scale: {
            width:{from: 0, to: 5},
            height:{from: 0, to: 5},
            x:32, y:32
        },
        easing: 'cosLoop'
    }
]);

let image = new ImageClass('image_icon.png');
image.setAnimation(animation);

let animation2 = new AnimationClass([
    {
        time: 2000,
        y: {value: 0},
        x: {from: 0, to: 400},
        scale: {
            width:{value: 0.25},
            height:{value: 0.25},
            x:0, y:0
        },
        rotate: {from: 0, to: -360*10, x:48.25, y:48.25},
        onFinish: 'addToEnd',
        easing: 'easeInCubic'
    },
    {
        time: 2000,
        x: {value: 400},
        y: {from: 0, to: 400},
        scale: {
            width:{value: 0.25},
            height:{value: 0.25},
            x:0, y:0
        },
        rotate: {from: 0, to: -360*10, x:48.25, y:48.25},
        onFinish: 'addToEnd',
        easing: 'easeOutCubic'
    },
    {
        time: 2000,
        y: {value: 400},
        x: {from: 400, to: 0},
        scale: {
            width:{value: 0.25},
            height:{value: 0.25},
            x:0, y:0
        },
        rotate: {from: 0, to: -360*10, x:48.25, y:48.25},
        onFinish: 'addToEnd',
        easing: 'easeInCubic'
    },
    {
        time: 2000,
        x: {value: 0},
        y: {from: 400, to: 0},
        scale: {
            width:{value: 0.25},
            height:{value: 0.25},
            x:0, y:0
        },
        rotate: {from: 0, to: -360*10, x:48.25, y:48.25},
        onFinish: 'addToEnd',
        easing: 'easeOutCubic'
    }
]);

let image2 = new ImageClass('image_saw.png');
image2.setAnimation(animation2);


let sprite = new ImageClass({
    image: 'image_sprite.png',
    width: 64,
    height: 64,
    sprites: {
        count: 8,
        speed: 1000,
        grid: {x:8, y:1},
    }
});



let texture = new TextureClass({
    image: sprite,
    grid : {x:5, y:5},
    position: {x:90, y:90}
});


let exp = new ImageClass({
    image: 'image_explosion.png',
    width: 100,
    height: 100,
    sprites: {
        count: 74,
        speed: 3000,
        grid: {x:9, y:9},
        easing: 'easeOutQuint'
    },
    animation: new AnimationClass([
        {
            time: 3000,
            loops: Infinity,
            opacity: {from: 1, to: 0},
            easing: 'easeOutQuint'
        }
    ])
});

let texture2 = new TextureClass({
    image: exp,
    grid : {x:5, y:5},
    position: {x:0, y:0}
});

let canvas2 = new CanvasClass({
    width: 500,
    height: 500
});
canvas2.addItem(texture2);


let canvas = new CanvasClass({
    width: 500,
    height: 500
});
canvas.addItem(canvas2);
canvas.addItem(texture);
canvas.addItem(image);
canvas.addItem(image2);

eventManager.requestAnimationFrame(function(time){
    //console.log(delta);
    canvas.clear();
    canvas.render(null, time);
});

canvas.show('canvas');
