/**
 * @author Davide Spano
 */

function Bounds(x, y, w, h){
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
}

Object.assign( Bounds.prototype, {
    set : function(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        return this;
    },

    setX : function(x){
        this.x = x;
        return this;
    },

    setY : function(y){
        this.y = y;
        return this;
    },

    setW : function(w){
        this.w = w;
        return this;
    },

    setH : function(h){
        this.h = h;
        return this;
    },

});

export {Bounds};