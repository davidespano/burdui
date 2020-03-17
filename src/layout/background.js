/**
 * @author Davide Spano
 */

import {Bounds} from "./bounds";
import {createRoundedRect} from "./utils";

function Background(bounds, color, rounded){
    this.bounds = bounds || new Bounds();
    this.color = color || "white";
    this.rounded = rounded || 0;
};

Object.assign( Background.prototype, {
    setColor : function(color){
        this.color = color;
        return this;
    },

    getColor: function(){
        return this.color;
    },

    setBounds : function(bounds){
        this.bounds = bounds;
        return this.bounds;
    },

    getBounds : function(){
        return this.bounds;
    },

    setRounded : function(rounded){
        this.rounded = rounded;
        return this;
    },

    paint : function(g, r){
        g.save();

        g.beginPath();
        g.rect(r.x, r.y, r.w, r.h);
        g.closePath();
        g.clip();

        g.fillStyle = this.color;
        g.beginPath();
        createRoundedRect(g, this.rounded, this.bounds);
        g.closePath();
        g.fill();
        g.restore();
    }
});

export {Background};