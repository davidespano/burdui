/**
 * @author Davide Spano
 */
import {Bounds} from "./bounds";
import {Utils} from "./utils";

function Border( bounds, color, lineWidth, rounded){
    this.color = color || "#ffffff00";
    this.bounds = bounds || new Bounds();
    this.rounded = rounded || 0;
    this.lineWidth = lineWidth || 0;
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

    paint : function(g, r){


        g.save();
        g.beginPath();
        g.rect(r.x, r.y, r.w, r.h);
        g.clip();
        if(this.lineWidth >0){
            g.strokeStyle = this.color;
            g.lineWidth = this.lineWidth;
            Utils.createRoundedRect(g, this.rounded, this.bounds);
            g.stroke();
        }

        g.restore();
    },
    paint2 : function(g, r){
        g.save();
        g.beginPath();
        g.arc(r.x+15, r.y+15, this.radio, 0, Math.PI * 2);
        g.clip();
        if(this.lineWidth >0){
            g.strokeStyle = this.color;
            g.lineWidth = this.lineWidth;
            g.stroke();
        }
        g.restore();
    }

});

export {Border};