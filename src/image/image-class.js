"use strict";

import RenderInterface from './../render/render-interface.js';

export default class ImageClass extends RenderInterface {

    constructor(image) {
        super();
        this.setImage(image);
        this.fx = null;
    }

    setImage(img) {
        if (typeof img === 'string') {
            this.image = null;
            let image = new Image();
            image.onload = () => {
                this.image = image;
            };
            image.src = img;
            return;
        }
        if (img instanceof Image) {
            this.image = img;
            return;
        }
        throw new Error('Invalid argument');
    }

    setFX (fx) {
        this.fx = fx;
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param delta
     */
    render (context, delta) {
        if (!this.image) {
            return;
        }
        if (this.fx) {
            if (this.fx.render(context, delta)) {
                context.drawImage(this.image, 0, 0);
            }
        } else {
            context.drawImage(this.image, 0, 0);
        }
    }

}
