"use strict";

import RenderInterface from './../render/render-interface.js';
import AnimationEasingFunctions from './animation-easing-functions.js';

export default class AnimationClass extends RenderInterface {

    constructor(items) {
        super();
        this.time = 0;
        this.setItems(items);
    }

    setItems(items) {
        if (!Array.isArray(items)) {
            throw new Error('Invalid arguments');
        }
        for (let i = 0; i < items.length; i += 1) {
            items[i].count = items[i].count || 1;
            items[i]._count = items[i].count;
            items[i].start = items[i].start || 0;
            items[i].pause = items[i].pause || 0;
            items[i].time = items[i].time || 1;
        }
        this.items = items;
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param delta
     */
    render(context, delta) {
        if (!this.items.length) {
            return false;
        }
        this.time += delta;
        let item, start, end, rate;

        for (;;) {
            item = this.items[0];
            if (!item) {
                return false;
            }
            if (!item.start) {
                item.start = this.time;
            }
            start = item.start;
            end = start + item.time;
            if (this.time > end) {
                start = item.start = this.time + item.pause;
                if ('count' in item) {
                    item.count -= 1;
                }
            }
            if (this.time < start) {
                return false;
            }
            if (item.count === 0) {
                let oldItem = this.items.shift();
                if ('onFinish' in oldItem) {
                    if (typeof oldItem.onFinish === 'function') {
                        oldItem.onFinish(this, oldItem);
                    } else if (oldItem.onFinish === 'addToEnd') {
                        oldItem.count = oldItem._count;
                        oldItem.start = 0;
                        this.items.push(oldItem);
                    }
                }
                continue;
            }
            rate = (this.time - start) / item.time;
            AnimationClass._renderItem(context, item, rate);
            return true;
        }
    }

    static _renderItem(context, item, rate) {
        // Сдвиг по х, y

        if ('easing' in item) {
            rate = AnimationClass._getEasingFunction(item.easing)(rate);
        }

        let x = 0, y = 0;
        if ('x' in item) {
            x = AnimationClass._calcRenderPropertyValue(item.x, rate);
        }
        if ('y' in item) {
            y = AnimationClass._calcRenderPropertyValue(item.y, rate);
        }
        if (x || y) {
            context.translate(x, y);
        }

        // Поворот
        if ('rotate' in item) {
            let angle = AnimationClass._calcRenderPropertyValue(item.rotate, rate) * Math.PI / 180;
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
                scale_x = AnimationClass._calcRenderPropertyValue(item.scale.width, rate);
            }
            if ('height' in item.scale) {
                scale_y = AnimationClass._calcRenderPropertyValue(item.scale.height, rate);
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
            context.globalAlpha = Math.max(0, AnimationClass._calcRenderPropertyValue(item.opacity, rate));
        }
    }

    /**
     * Высчитать значения для эффекта
     * @param {Object} property Свойство
     * @param {number} ratio Коэффициент шага
     * @returns {number}
     * @private
     */
    static _calcRenderPropertyValue (property, ratio) {
        if ('value' in  property) {
            return property.value;
        }
        return property.from + (property.to - property.from) * (property.easing ? AnimationClass._getEasingFunction(property.easing)(ratio) : ratio);
    }

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
