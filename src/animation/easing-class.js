"use strict";

import AnimationEasingFunctions from './animation-easing-functions.js';

export default class EasingClass {

    /**
     * Высчитать значения для эффекта
     * @param {Object} property Свойство
     * @param {number} ratio Коэффициент шага
     * @returns {number}
     * @private
     */
    static calcRenderPropertyValue (property, ratio) {
        if ('value' in  property) {
            return property.value;
        }
        return property.from + (property.to - property.from) * (property.easing ? EasingClass.getEasingFunction(property.easing)(ratio) : ratio);
    }

    static getEasingFunction (easing) {
        if (typeof easing === 'function') {
            return easing;
        }
        if (typeof(easing) === 'string' && easing in AnimationEasingFunctions) {
            return AnimationEasingFunctions[easing];
        }
        return AnimationEasingFunctions.linear;
    }

}
