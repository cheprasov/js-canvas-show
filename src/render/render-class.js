"use strict";

import AnimationClass from './../animation/animation-class.js';

export default class Render {

    constructor(options) {
        options = options || {};

        this.setSize(options.width, options.height);
        this.setClip(options.clip);

        if ('position' in options) {
            this.setPosition(options.position.x, options.position.y);
        }

        if ('animation' in options) {
            this.setAnimation(options.animation);
        }
    }

    setClip (clip) {
        this.clip = {
            x: clip && clip.x || 0,
            y: clip && clip.y || 0,
            w: clip && clip.w || this.width || 0,
            h: clip && clip.h || this.height || 0
        };
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

    setSize(width, height) {
        this.width = width || 0;
        this.height = height || 0;
    }

    setAnimation (animation) {
        if (animation instanceof AnimationClass) {
            this.animation = animation;
        } else {
            this.animation = new AnimationClass(animation);
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param time
     */
    render (context, time) {
        if (this.position && (this.position.x || this.position.y)) {
            context.translate(this.position.x, this.position.y);
        }
        if (!this.animation || this.animation.render(context, time)) {
            this._render(context, time);
        }
    }

}
