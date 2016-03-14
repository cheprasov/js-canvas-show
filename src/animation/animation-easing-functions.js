"use strict";

/**
 * @todo:  create AnimationEasingClass
 * @type {{linear: Function, swing: Function, cosLoop: Function}}
 */
let AnimationEasingFunctions = {

        linear: function(p) {
            return p;
        },

        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        },

        cosLoop: function(p) {
            return -Math.cos(p * Math.PI * 2) * 0.5 + 0.5;
        }

    };

    // Easing functions
    // based on easing equations from Robert Penner (http://www.robertpenner.com/easing)
    // base on http://jqueryui.com/easing/

    // Examples: http://jqueryui.com/resources/demos/effect/easing.html

    // easeInBack ,easeInBounce, easeInCirc, easeInCubic, easeInElastic, easeInExpo,
    // easeInOutBack, easeInOutBounce, easeInOutCirc, easeInOutCubic, easeInOutElastic, easeInOutExpo,
    // easeInOutQuad, easeInOutQuart, easeInOutQuint, easeInOutSine, easeInQuad, easeInQuart, easeInQuint,
    // easeInSine, easeOutBack, easeOutBounce, easeOutCirc, easeOutCubic, easeOutElastic, easeOutExpo, easeOutQuad,
    // easeOutQuart, easeOutQuint, easeOutSine

    // Examples: http://easings.net

    var baseEasings = {};

    [ "Quad", "Cubic", "Quart", "Quint", "Expo" ].map(function(name, i) {
        baseEasings[name] = function(p) {
            return Math.pow(p, i + 2);
        };
    });

    Object.assign(baseEasings, {
        Sine: function(p) {
            return 1 - Math.cos(p * Math.PI / 2);
        },
        Circ: function(p) {
            return 1 - Math.sqrt(1 - p * p);
        },
        Elastic: function(p) {
            return p === 0 || p === 1 ? p :
            -Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
        },
        Back: function(p) {
            return p * p * (3 * p - 2);
        },
        Bounce: function(p) {
            var pow2,
                bounce = 4;
            while ( p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {};
            return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
        }
    });

    for (let name in baseEasings) {
        if (!baseEasings.hasOwnProperty(name)) {
            continue;
        }
        let easeIn = baseEasings[name];
        AnimationEasingFunctions["easeIn" + name] = easeIn;
        AnimationEasingFunctions["easeOut" + name] = function(p) {
            return 1 - easeIn(1 - p);
        };
        AnimationEasingFunctions["easeInOut" + name] = function(p) {
            return p < 0.5 ?
            easeIn( p * 2 ) / 2 :
            1 - easeIn( p * -2 + 2 ) / 2;
        };
    }

export default AnimationEasingFunctions;

