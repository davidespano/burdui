/**
 * @author Davide Spano
 */

import {Bounds} from "../layout/bounds";
import {Background} from "../layout/background";
import {Border} from "../layout/border";
import {EventTypes} from "../event";

function View(){
    this.bounds = new Bounds();
    this.border = new Border();
    this.background = new Background();
    this.name = "";
    this.children = [];
    this.isView = true;
    this.parent = null;
    this.listeners = {};

    this.addEventListener(EventTypes.mouseClick, function(source, e){
        console.log(`mouse click (${e.x}, ${e.y}) on view ${source.name}`);
    })
}

Object.assign(View.prototype, {
    setBounds : function(bounds){
        this.bounds = bounds;
        this.border.setBounds(new Bounds(0,0, this.bounds.w, this.bounds.h));
        this.background.setBounds(new Bounds(
            this.border.lineWidth/2,
            this.border.lineWidth/2,
            this.bounds.w - this.border.lineWidth,
            this.bounds.h - this.border.lineWidth));
        return this;
    },

    getBounds : function(){
        return this.bounds;
    },

    setName : function(name){
        this.name = name;
        return this;
    },

    getName : function(){
        return name;
    },

    setBackgroundColor: function(color){
        this.background.setColor(color);
        return this;
    },

    getBackgroundColor: function(){
        return this.background.getColor();
    },

    setBorderLineWidth: function(width){
        this.border.setLineWidth(width);
        this.background.setBounds(new Bounds(
            this.border.lineWidth/2,
            this.border.lineWidth/2,
            this.bounds.w - this.border.lineWidth,
            this.bounds.h - this.border.lineWidth));
        return this;
    },

    getBorderLineWidth: function(){
        return this.border.getLineWidth();
    },

    setBorderColor: function(color){
        this.border.setColor(color);
        return this;
    },

    getBorderColor: function(){
        return this.border.getColor();
    },

    setBorderRounded: function(rounded){
        this.border.setRounded(rounded);
        this.background.setRounded(rounded);
        return this;
    },

    getBorderRounded: function(){
        return this.border.getRounded();
    },

    addChild: function(c){
        if(!c){
            return this;
        }
        if(c.isView){
            this.children.push(c);
            c.parent = this;
        }
        return this;
    },


    paintChildren: function(g, b){
        let r = b || this.bounds;
        for(let c of this.children){
            let intersection = c.bounds.intersection(r);
            if(intersection.w > 0 && intersection.h > 0){
                // the children is in the damaged area
                g.save();
                g.translate(c.bounds.x, c.bounds.y);
                intersection.setX(intersection.x - c.bounds.x);
                intersection.setY(intersection.y - c.bounds.y);
                c.paint(g, intersection);
                g.restore();
            }
        }
    },

    paint: function(g, b){
        let r = b || this.bounds;

        g.save();
        // setting the clipping region. The view cannot draw outside its bounds
        g.beginPath();
        g.rect(r.x, r.y, r.w, r.h);
        g.clip();

        this.background.paint(g, r);
        this.border.paint(g, r);

        // draw the children views.
        this.paintChildren(g,r);
        g.restore();

    },

    invalidate : function(r, source){
        source = source || this;
        r = r || new Bounds(0,0, this.bounds.w, this.bounds.h);
        if(this.parent != null){
            // move to the parent reference system
            let damagedArea = new Bounds(
                this.bounds.x + r.x,
                this.bounds.y + r.y,
                r.w, r.h);
            // intersect the requested area with the current bounds
            damagedArea = damagedArea.intersection(this.bounds);

            // bubble up the request to the parent
            this.parent.invalidate(damagedArea, source);
        }
    },

    addEventListener : function(eventType, listener){
        if(!this.listeners[eventType]){
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(listener);
    },

    raise : function(source, eventType, args){
        if(this.listeners[eventType]){
            for(let l of this.listeners[eventType]){
                l(source, args);
            }
        }
    },


});

export {View};
