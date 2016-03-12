"use strict";

import RenderInterface from './../render/render-interface.js';
import FXEasingFunctions from './fx-easing-functions.js';

export default class FXClass extends RenderInterface {

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
        this.time += delta;
        let item, start, end, rate;

        for (;;) {
            item = this.items[0];
            if (!item) {
                return false;
            }
            start = item.start;
            end = start + item.time;
            if (this.time < start) {
                return false;
            }
            if (this.time > end) {
                start = item.start = this.time + item.pause;
                if ('count' in item) {
                    item.count -= 1;
                }
            }
            if (item.count === 0) {
                this.items.shift();
                continue;
            }
            rate = (this.time - start) / item.time;
            this._renderItem(context, item, rate);
            return true;
        }
    }

    _renderItem(context, item, rate) {
        // Сдвиг по х, y

        if ('easing' in item) {
            rate = FXClass._getEasingFunction(item.easing)(rate);
        }

        let x = 0, y = 0;
        if ('x' in item) {
            x = FXClass._calcRenderPropertyValue(item.x, rate);
        }
        if ('y' in item) {
            y = FXClass._calcRenderPropertyValue(item.y, rate);
        }
        if (x || y) {
            context.translate(x, y);
        }

        // Поворот
        if ('rotate' in item) {
            let angle = FXClass._calcRenderPropertyValue(item.rotate, rate) * Math.PI / 180;
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
                scale_x = FXClass._calcRenderPropertyValue(item.scale.width, rate);
            }
            if ('height' in item.scale) {
                scale_y = FXClass._calcRenderPropertyValue(item.scale.height, rate);
            }
            x = 'x' in item.scale ? item.scale.x : (item.width / 2 || 0);
            y = 'y' in item.scale ? item.scale.y : (item.height / 2 || 0);
            if (x || y) {
                context.translate(x, y);
                context.scale(scale_x, scale_y);
                context.translate(-x, -y);
            } else {
                context.rotate(angle);
            }
        }

        if ('opacity' in item) {
            context.globalAlpha = Math.max(0, FXClass._calcRenderPropertyValue(item.opacity, rate));
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
        return property.from + (property.to - property.from) * (property.easing ? FXClass._getEasingFunction(property.easing)(ratio) : ratio);
    }


    _renderAnimate (context) {

        if (!this.animateList || !this.animateList.length) {
            return;
        }

        var item = this.animateList[0];
        if (!item._startTime) {
            item._startTime = Date.now();
        }

        var deltaTime = Math.min(1, (Date.now() - item._startTime) / item.time);
        var rate = 'easing' in item ? this._getAminateEasingFunction(item.easing)(deltaTime) : deltaTime;

        // Сдвиг по х, y
        var x = 0, y = 0;
        if ('x' in item) {
            x = this._calcRenderPropertyValue(item.x, rate);
        }
        if ('y' in item) {
            y = this._calcRenderPropertyValue(item.y, rate);
        }
        if (x || y) {
            context.translate(x, y);
        }

        // Поворот
        if ('rotate' in item) {
            var angle = this._calcRenderPropertyValue(item.rotate, rate) * Math.PI / 180;
            context.translate(
                'x' in item.rotate ? item.rotate.x : item.width / 2,
                'y' in item.rotate ? item.rotate.y : item.height / 2
            );
            context.rotate(angle);
            context.translate(
                'x' in item.rotate ? -item.rotate.x : -item.width / 2,
                'y' in item.rotate ? -item.rotate.y : -item.height / 2
            );
        }

        // Масштабирование
        if ('scale' in item) {
            var scale_x = 1,
                scale_y = 1;
            if ('x' in item.scale) {
                scale_x = this._calcRenderPropertyValue(item.scale.x, rate);
            }
            if ('y' in item.scale) {
                scale_y = this._calcRenderPropertyValue(item.scale.y, rate);
            }
            context.translate(item.width / 2, item.height / 2);
            context.scale(scale_x, scale_y);
            context.translate(-item.width / 2, -item.height / 2);
        }

        if ('opacity' in item) {
            context.globalAlpha = Math.max(0, this._calcRenderPropertyValue(item.opacity, rate));
        }

        if (deltaTime >= 1) {
            item._startTime = 0;
            item.times--;
            this.animateList.shift()
            if (item.times) {
                this.animateList.push(item);
            } else {
                item.onDone && item.onDone();
            }
        }
    }

    static _getEasingFunction (easing) {
        if (typeof easing === 'function') {
            return easing;
        }
        if (typeof(easing) === 'string' && easing in FXEasingFunctions) {
            return FXEasingFunctions[easing];
        }
        return FXEasingFunctions.linear;
    }

}
