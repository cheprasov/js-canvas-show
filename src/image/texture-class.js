"use strict";

import RenderClass from './../render/render-class.js';

export default class TextureClass extends RenderClass {

    constructor(options) {
        super(options);

        if ('source' in options) {
            this.setSource(options.source);
        }

        this.map = [];

        if ('grid' in options) {
            this.setGrid(options.grid);
        }

        if ('maps' in options) {
            this.setMaps(options.maps);
        }
    }

    setGrid(grid) {
        grid = {
            x: grid && grid.cols || 1,
            y: grid && grid.rows || 1,
            w: grid && grid.width || this.source && this.source.getWidth() || 1,
            h: grid && grid.height || this.source && this.source.getHeight() || 1
        };
        for (let y = 0; y < this.grid.rows; y += 1) {
            for (let x = 0; x < this.grid.cols; x += 1) {
                this.maps.push({
                    x: x * this.grid.width,
                    y: y * this.grid.height
                });
            }
        }
    }

    /**
     * @param {Array} maps
     */
    setMaps(maps) {
        this.maps = maps;
    }

    /**
     * @param {RenderClass} source
     */
    setSource(source) {
        this.source = source;
    }

    _render(context, time) {
        let maps;
        for (let i = 0; i < this.maps.length; i += 1) {
            maps = this.maps[i];
            context.translate(maps.x, maps.y);
            this.source.render(context, time);
            context.translate(-maps.x, -maps.y);
        }
    }

}
