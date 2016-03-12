"use strict";

export default class Canvas {

    /**
     * @param {Object} options
     */
    constructor(options) {
        options = options || {
                width: 300,
                height: 200
            };
        this.canvas = document.createElement('canvas');
        this.setSize(options.width, options.height);
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

}
