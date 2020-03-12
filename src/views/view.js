/**
 * @author Davide Spano
 */

import {Bounds} from "../layout/bounds";

function View(){
    this.bounds = new Bounds();
    this.name = "";
    this.children = [];
    this.isView = true;
}

Object.assign(View.prototype, {
    setBounds : function(bounds){
        this.bounds = bounds;
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

    addChild: function(c){
        if(!c){
            return this;
        }
        if(c.isView){
            this.children.push(c);
        }
        return this;
    },


    paintChildren: function(g){
        for(let c of this.children){
            g.save();
            g.translate(c.bounds.x, c.bounds.y);
            c.paint(g);
            g.restore();
        }
    },

    paint: function(g){
        g.save();
        g.strokeStyle = "black";
        g.strokeRect(
            0,
            0,
            this.bounds.w,
            this.bounds.h);

        // setting the clipping region. The view cannot draw outside its bounds
        g.beginPath();
        g.rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        g.clip();

        // draw the children views.
        this.paintChildren(g);
        g.restore();

    },
});

export {View};
