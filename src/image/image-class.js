"use strict";

import RenderInterface from './../render/render-interface.js';
import AnimationEasingFunctions from './../animation/animation-easing-functions.js';

export default class ImageClass extends RenderInterface {

    constructor(options) {
        super();

        if (typeof options === 'string') {
            this.setImage(options);
            return
        }

        this.width = options.width || 0;
        this.height = options.height || 0;

        this.setClip(options.clip);

        if ('position' in options) {
            this.setPosition(options.position.x, options.position.y);
        }

        if ('sprites' in options) {
            this.setSprites(options.sprites);
        }

        if ('animation' in options) {
            this.setAnimation(options.animation);
        }

        this.setImage(options.image);
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
            if (!this.width) {
                this.width = image.width;
            }
            if (!this.height) {
                this.height = image.height;
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

    setPosition (x, y) {
        this.position = {
            x: x || 0,
            y: y || 0
        };
    }

    getPosition() {
        return Object.assign({}, this.position || {});
    }

    getWidth() {
        return this.width || 0;
    }

    getHeight() {
        return this.height || 0;
    }

    setClip (clip) {
        this.clip = {
            x: clip && clip.x || 0,
            y: clip && clip.y || 0,
            w: clip && clip.w || this.width || 0,
            h: clip && clip.h || this.height || 0
        };
    }

    setAnimation (animation) {
        this.animation = animation;
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {float} time
     */
    render (context, time) {
        if (!this.image) {
            return;
        }
        if (this.animation) {
            if (this.animation.render(context, time)) {
                this._render(context, time);
            }
        } else {
            this._render(context, time);
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {float} time
     */
    _render(context, time) {
        if (this.position && (this.position.x || this.position.y)) {
            context.translate(this.position.x, this.position.y);
        }
        if (this.sprites) {
            if (!this.sprites._time) {
                this.sprites._time = time;
            }
            let delta = time - this.sprites._time;
            let index = Math.floor((delta % this.sprites.speed) / this.sprites.rate);
            if (this.sprites.easing) {
                index = Math.round((this.sprites.count - 1) * ImageClass. _getEasingFunction(this.sprites.easing)((index + 1) / this.sprites.count));
            }
            let frame = this.sprites.frames[index];
            context.drawImage(this.image, frame.x, frame.y, this.width, this.height, 0, 0, this.width, this.height);
        } else {
            context.drawImage(this.image, this.clip.x, this.clip.y, this.clip.w, this.clip.h, 0, 0, this.width, this.height);
        }
    }

    /**
     * @todo: move to AnimationEasingClass
     * @param easing
     * @returns {*}
     * @private
     */
    static _getEasingFunction (easing) {
        if (typeof easing === 'function') {
            return easing;
        }
        if (typeof(easing) === 'string' && easing in AnimationEasingFunctions) {
            return AnimationEasingFunctions[easing];
        }
        return AnimationEasingFunctions.linear;
    }

}
