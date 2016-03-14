"use strict";

import RenderInterface from './../render/render-interface.js';

export default class CanvasClass extends RenderInterface {

    /**
     * @param {Object} options
     */
    constructor(options) {
        super();
        options = options || {
                width: 300,
                height: 200
            };
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.setSize(options.width, options.height);

        this.items = [];
    }

    setSize(width, height) {
        this.canvas.width = width || this.canvas.width || 0;
        this.canvas.height = height || this.canvas.height || 0;
    }

    clear() {
        this.setSize();
    }

    /**
     * @param {HTMLElement|string} container
     */
    show(container = null) {
        if (container) {
            let element;
            if (typeof container === 'string') {
                element = document.getElementById(container);
            }
            element.appendChild(this.canvas);
        }
    }

    /**
     * @param {RenderInterface} item
     */
    addItem (item) {
        this.items.push(item);
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param time
     */
    render (context, time) {
        //td += delta;
        //this.index += this.rate * delta;
        //console.clear();
        //console.log(this.index);
        //console.log(td);
        //this.clear();
        context = context || this.context;
        for (let i = 0; i < this.items.length ; i += 1) {
            context.save();
            this.items[i].render(context, time);
            context.restore();
        }
    }

}
