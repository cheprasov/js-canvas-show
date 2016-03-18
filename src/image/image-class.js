"use strict";

import RenderClass from './../render/render-class.js';
import EasingClass from './../animation/easing-class.js';

export default class ImageClass extends RenderClass {

    constructor(options) {
        super(options);

        if ('sprites' in options) {
            this.setSprites(options.sprites);
        }

        if ('image' in options) {
            this.setImage(options.image);
        }
    }

    setSprites(sprites) {
        this.sprites = {
            loops: sprites.loops || 1,
            speed: sprites.speed || 1,
            count: sprites.count || 1,
            easing: sprites.easing || null,
            frames: sprites.frames || [],
            _time: 0
        };
        this.sprites.rate = this.sprites.speed / this.sprites.count;
        if (sprites && sprites.grid && sprites.grid.x && sprites.grid.y) {
            let count = 0;
            for (let y = 0; y < sprites.grid.y; y += 1) {
                for (let x = 0; x < sprites.grid.x; x += 1) {
                    if (count < this.sprites.count) {
                        this.sprites.frames.push({
                            x: x * this.width,
                            y: y * this.height
                        });
                        count += 1;
                    }
                }
            }
        }
    }

    /**
     * @param {HTMLImageElement|string} img
     */
    setImage(img) {
        let onloaded = (image) => {
            if (!this.width || !this.height) {
                this.setSize(image.width, image.width);
                this.setClip();
            }
            if (!this.clip) {
                this.setClip();
            }
        };

        if (typeof img === 'string') {
            this.image = null;
            let image = new Image();
            image.onload = () => {
                this.image = image;
                onloaded(image);
            };
            image.src = img;
            return;
        }

        if (img instanceof Image) {
            this.image = img;
            onloaded(img);
            return;
        }
        throw new Error('Invalid argument');
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {float} time
     */
    _render(context, time) {
        if (!this.image) {
            return;
        }
        if (this.sprites) {
            if (!this.sprites._time) {
                this.sprites._time = time;
            }
            let delta = time - this.sprites._time;
            let index = Math.floor((delta % this.sprites.speed) / this.sprites.rate);
            if (this.sprites.easing) {
                index = Math.round((this.sprites.count - 1) * EasingClass.getEasingFunction(this.sprites.easing)((index + 1) / this.sprites.count));
            }
            let frame = this.sprites.frames[index];
            context.drawImage(this.image, frame.x, frame.y, this.width, this.height, 0, 0, this.width, this.height);
        } else {
            context.drawImage(this.image, this.clip.x, this.clip.y, this.clip.w, this.clip.h, 0, 0, this.width, this.height);
        }
    }

}
