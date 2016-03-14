"use strict";

import RenderInterface from './../render/render-interface.js';

export default class TextureClass extends RenderInterface {

    constructor(options) {
        super();

        if ('position' in options) {
            this.setPosition(options.position.x, options.position.y);
        }

        if ('image' in options) {
            this.setImage(options.image);
        }

        this.setGrid(options.grid);
    }

    setGrid(grid) {
        this.grid = {
            x: grid && grid.x || 1,
            y: grid && grid.y || 1,
            w: grid && grid.w || this.image && this.image.getWidth() || 1,
            h: grid && grid.h || this.image && this.image.getHeight() || 1
        }
    }

    setPosition () {
        this.position = {
            x: arguments[0] || 0,
            y: arguments[1] || 0
        };
    }

    /**
     * @param {ImageClass} image
     */
    setImage(image) {
        this.image = image;
    }

    render(context, time) {
        if (this.position && (this.position.x || this.position.y)) {
            context.translate(this.position.x, this.position.y);
        }
        let tx, ty;
        for (let y = 0; y < this.grid.y; y += 1) {
            for (let x = 0; x < this.grid.x; x += 1) {
                tx = x * this.grid.w;
                ty = y * this.grid.h;
                context.translate(tx, ty);
                this.image.render(context, time);
                context.translate(-tx, -ty);
            }
        }
    }

}
