"use strict";

export default class EventManagerClass {

    constructor () {
        this.events = {};
    }

    bind (event, callback) {

    }

    requestAnimationFrame (callback) {
        let requestAnimFrame = (function() {
            if (0) {
                return function (callback) {
                    window.setTimeout(callback, 1000 / 1);
                };
            }
            return window.requestAnimationFrame    ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        //let lastTime = Date.now();

        let render = function() {
            let time = Date.now();
            //let delta = (now - lastTime) / 1000;
            callback(time);
            //lastTime = now;
            requestAnimFrame(render);
        };

        requestAnimFrame(render);
    }

}
