"use strict";
import CanvasClass from "./canvas/canvas-class.js";
import EventManagerClass from "./event/event-manager-class.js";
import ImageClass from "./image/image-class.js";
import FXClass from "./animation/animation-class.js";

let eventManager = new EventManagerClass();

let animation = new FXClass([
    {
        time: 2,
        x: {from: 0, to: 400},
        y: {from: 0, to: 200},
        opacity: {from: 1, to: 0.1},
        rotate: {from: 0, to: 360, x:32, y:0},
        easing: 'easeInCubic'
    },
    {
        start: 2,
        time: 2,
        x: {value: 400},
        y: {from: 200, to: 400},
        opacity: {from: 0.1, to: 1},
        easing: 'easeOutCubic'
    }
]);

let image = new ImageClass('icon64x64.png');
image.setAnimation(animation);

let animation2 = new FXClass([
    {
        time: 2,
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
        time: 2,
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
        time: 2,
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
        time: 2,
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

let image2 = new ImageClass('saw386px.png');
image2.setAnimation(animation2);


let canvas = new CanvasClass({
    width: 500,
    height: 500
});
canvas.show('canvas');



canvas.addItem(image2);
canvas.addItem(image);

eventManager.requestAnimationFrame(function(delta){
    //console.log(delta);
    canvas.clear();
    canvas.render(null, delta);
});

