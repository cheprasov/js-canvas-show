"use strict";

import RenderClass from './../render/render-class.js';

export default class CanvasClass extends RenderClass {

    /**
     * @param {Object} options
     */
    constructor(options) {
        super(options);
        options = options || {};
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.setSize(options.width, options.height);
        if (options.items && Array.isArray(options.items)) {
            this.items = options.items;
        } else {
            this.items = [];
        }
    }

    getContext() {
        return this.context;
    }

    setSize(width, height) {
        super.setSize(width, height);
        if (this.canvas) {
            this.canvas.width = width || this.canvas.width || 0;
            this.canvas.height = height || this.canvas.height || 0;
        }
    }

    clear() {
        this.context.clearRect(-1, -1, this.canvas.width + 3, this.canvas.height + 3);
    }

    /**
     * @param {RenderClass} item
     */
    addItem (item) {
        this.items.push(item);
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

    render(context, time) {
        if (context) {
            super.render(context, time);
        } else {
            this._render(context, time);
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param time
     */
    _render (context, time) {
        this.clear();
        for (let i = 0; i < this.items.length ; i += 1) {
            this.context.save();
            this.items[i].render(this.context, time);
            this.context.restore();
        }
        if (context) {
            context.drawImage(this.canvas, 0, 0);
        }
    }

}
