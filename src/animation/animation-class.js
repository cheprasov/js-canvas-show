"use strict";

import EasingClass from './easing-class.js';

export default class AnimationClass {

    constructor(items) {
        this._time = 0;
        this.setItems(items);
    }

    setItems(items) {
        if (!Array.isArray(items)) {
            throw new Error('Invalid arguments');
        }
        for (let i = 0; i < items.length; i += 1) {
            items[i].loops = items[i].loops || 1;
            items[i]._loops = items[i].loops;
            items[i].start = items[i].start || 0;
            items[i].pause = items[i].pause || 0;
            items[i].time = items[i].time || 1;
        }
        this.items = items;
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param time
     */
    render(context, time) {
        if (!this.items.length) {
            return false;
        }
        if (!this._time) {
            this._time = time;
        }
        let item, start, end, rate;

        for (;;) {
            item = this.items[0];
            if (!item) {
                return false;
            }
            if (!item.start) {
                item.start = time + item.pause;
            }
            start = item.start;
            end = start + item.time;
            if (time > end) {
                start = item.start = time + item.pause;
                if ('loops' in item) {
                    item.loops -= 1;
                }
            }
            if (time < start) {
                return false;
            }
            if (item.loops === 0) {
                let oldItem = this.items.shift();
                if ('onFinish' in oldItem) {
                    if (typeof oldItem.onFinish === 'function') {
                        oldItem.onFinish(this, oldItem);
                    } else if (oldItem.onFinish === 'addToEnd') {
                        oldItem.loops = oldItem._loops;
                        oldItem.start = 0;
                        this.items.push(oldItem);
                    }
                }
                continue;
            }
            rate = (time - start) / item.time;
            AnimationClass.renderItem(context, item, rate);
            return true;
        }
    }

    static renderItem(context, item, rate) {
        // Сдвиг по х, y

        if ('easing' in item) {
            rate = EasingClass.getEasingFunction(item.easing)(rate);
        }

        let x = 0, y = 0;
        if ('x' in item) {
            x = EasingClass.calcRenderPropertyValue(item.x, rate);
        }
        if ('y' in item) {
            y = EasingClass.calcRenderPropertyValue(item.y, rate);
        }
        if (x || y) {
            context.translate(x, y);
        }

        // Поворот
        if ('rotate' in item) {
            let angle = EasingClass.calcRenderPropertyValue(item.rotate, rate) * Math.PI / 180;
            x = 'x' in item.rotate ? item.rotate.x : (item.width / 2 || 0);
            y = 'y' in item.rotate ? item.rotate.y : (item.height / 2 || 0);
            if (x || y) {
                context.translate(x, y);
                context.rotate(angle);
                context.translate(-x, -y);
            } else {
                context.rotate(angle);
            }
        }

        // Масштабирование
        if ('scale' in item) {
            let scale_x = 1,
                scale_y = 1;
            if ('width' in item.scale) {
                scale_x = EasingClass.calcRenderPropertyValue(item.scale.width, rate);
            }
            if ('height' in item.scale) {
                scale_y = EasingClass.calcRenderPropertyValue(item.scale.height, rate);
            }
            x = 'x' in item.scale ? item.scale.x : (item.width / 2 || 0);
            y = 'y' in item.scale ? item.scale.y : (item.height / 2 || 0);
            if (x || y) {
                context.translate(x, y);
                context.scale(scale_x, scale_y);
                context.translate(-x, -y);
            } else {
                context.scale(scale_x, scale_y);
            }
        }

        if ('opacity' in item) {
            context.globalAlpha = Math.max(0, EasingClass.calcRenderPropertyValue(item.opacity, rate));
        }
    }

}
