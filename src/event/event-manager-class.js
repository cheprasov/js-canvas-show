"use strict";

export default class EventManagerClass {

    constructor () {
        this.events = {};
    }

    bind (event, callback) {

    }

    requestAnimationFrame (callback) {
        let requestAnimFrame = (function() {
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
            callback(time);
            requestAnimFrame(render);
        };

        requestAnimFrame(render);
    }

}
