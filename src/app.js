"use strict";
import AnimationClass from "./animation/animation-class.js";
import CanvasClass from "./canvas/canvas-class.js";
import EventManagerClass from "./event/event-manager-class.js";
import ImageClass from "./image/image-class.js";
import TextureClass from "./image/texture-class.js";

let App = {
    Animation: AnimationClass,
    Canvas: CanvasClass,
    Image: ImageClass,
    Texture: TextureClass,
    EventManager: EventManagerClass
};

window.CanvasShow = App;
