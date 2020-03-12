/**
 * @author Davide Spano
 */
import {View} from "./view";
import {Bounds} from "../layout/bounds";

function StackPanel(style){
    View.call(this);
    this.style = (style === "vertical" || style === "horizontal")? style : "vertical";
    this.padding = 0;
}

StackPanel.prototype = Object.assign( Object.create( View.prototype ), {

    constructor: StackPanel,

    setBounds: function (bounds){
        View.prototype.setBounds.call(this, bounds);
        this.updateBounds();
        return this;
    },

    addChild: function(child){
        View.prototype.addChild.call(this, child);

        // not optimized, we can speed-up setting the bounds of the last child.
        this.updateBounds();

        return this;
    },

    setStyle : function(style){
        this.style = (style === "vertical" || style === "horizontal")? style : "vertical";
        return this;
    },

    getStyle : function(){
        return this.style;
    },

    setPadding: function(padding){
        this.padding = padding;
        return this;
    },

    getPadding: function(){
        return this.padding;
    },

    updateBounds: function(){
        let next = 0;
        for(let i in this.children) {
            let c = this.children[i];
            switch(this.style){
                case "vertical":
                    c.setBounds(new Bounds(0, next, this.bounds.w, c.bounds.h));
                    next += c.bounds.h + this.padding;
                    break;

                case "horizontal":
                    c.setBounds(new Bounds(next, 0, c.bounds.w, this.bounds.h));
                    next += c.bounds.w + this.padding;
                    break;
            }
        }
    },

});

export {StackPanel};