"use strict";
import CanvasClass from "./canvas/canvas-class.js";
import EventManagerClass from "./event/event-manager-class.js";
import ImageClass from "./image/image-class.js";
import FXClass from "./fx/fx-class.js";

let eventManager = new EventManagerClass();

let fx = new FXClass([
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
image.setFX(fx);

let fx2 = new FXClass([

    {
        time: 5,
        count: Infinity,
        y: {value: 200},
        x: {from: 0, to: 400},
        //scale: {
        //    width:{from: 1, to: 5},
        //    height:{from: 1, to: 5},
        //    x:32, y:32
        //},
        rotate: {from: -90, to: 90, x:32, y:32},
        easing: function(rate) {
            //return Math.sin(rate * Math.PI);
            return Math.cos(rate * Math.PI * 2) * 0.5 + 0.5;
        },
        onFinish: function() {

        }
    },
    //{
    //    time: 4,
    //    start: 4,
    //    count: 3,
    //    x: {value: 200},
    //    y: {value: 200},
    //    //y: {from: 0, to: 400},
    //    scale: {
    //        width:{from: 10, to: 1},
    //        height:{from: 10, to: 1},
    //        x:32, y:32
    //    },
    //    easing: 'easeOutElastic'
    //}
]);

let image2 = new ImageClass('icon64x64.png');
image2.setFX(fx2);


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

