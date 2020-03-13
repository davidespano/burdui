import {View} from "./view";
import {Border} from "../layout/border";
import {Background} from "../layout/background";
import {Bounds} from "../layout/bounds";
import {Text} from "../layout/text";

function TextField(bounds){
    View.call(this);
    this.bounds = bounds || new Bounds();
    this.border = new Border();
    this.background = new Background();
    this.text = new Text('Prova Testo');
}

TextField.prototype = Object.assign(Object.create(View.prototype), {

    constructor: TextField,

    setBounds: function(bounds){
        this.bounds = bounds;
        this.border.setBounds(new Bounds(0, 0, this.bounds.w, this.bounds.h));
        this.background.setBounds(new Bounds(
            this.border.lineWidth/2,
            this.border.lineWidth/2,
            this.bounds.w - this.border.lineWidth,
            this.bounds.h - this.border.lineWidth));
        this.text.setAlign("center");
        this.text.setBaseline("middle");
        this.text.setPosition(
            this.bounds.w/2,
            this.bounds.h/2);
        return this;
    },

    getBounds : function(){
        return this.bounds;
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

    setTextColor: function(color){
        this.text.setColor(color);
        return this;
    },

    getTextColor: function(){
        return this.text.getColor();
    },

    getText: function(){
        return this.text.getText();
    },

    setFont: function(font){
        this.text.setFont(font);
        return this;
    },

    getFont: function(){
        return this.text.getFont();
    },

    paint: function(g){
        this.background.paint(g);
        this.border.paint(g);
        this.text.paint(g);
    },
});

export {TextField};