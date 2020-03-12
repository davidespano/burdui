/**
 * @author Davide Spano
 */
import {Bounds} from "./bounds";
import {createRoundedRect} from "./utils";

function Border( bounds, color, lineWidth, rounded){
    this.color = color || "black";
    this.bounds = bounds || new Bounds();
    this.rounded = rounded || 0;
    this.lineWidth = lineWidth || 1;
}

Object.assign( Border.prototype, {

    setColor : function(color){
        this.color = color;
        return this;
    },

    getColor: function(){
        return this.color;
    },

    setLineWidth : function(width){
        this.lineWidth = width;
        return this;
    },

    getLineWidth: function(){
        return this.lineWidth;
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

    getRounded : function(){
        return this.rounded;
    },

    paint : function(g){


        g.save();
        g.strokeStyle = this.color;
        g.lineWidth = this.lineWidth;
        createRoundedRect(g, this.rounded, this.bounds);
        g.stroke();
        g.restore();
    },

});

export {Border};