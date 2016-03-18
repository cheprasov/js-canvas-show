"use strict";

import RenderClass from './../render/render-class.js';

export default class TextureClass extends RenderClass {

    constructor(options) {
        super(options);

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

    /**
     * @param {ImageClass} image
     */
    setImage(image) {
        this.image = image;
    }

    _render(context, time) {
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
