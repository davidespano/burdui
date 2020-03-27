/**
 * @author Emanuele Concas
 */

import {View} from "./view";
import {Border} from "../layout/border";
import {Background} from "../layout/background";
import {Bounds} from "../layout/bounds";
import {Text} from "../layout/text";
import {EventTypes} from "../event";

function TextField(bounds){
    View.call(this);
    this.bounds = bounds || new Bounds();
    this.border = new Border();
    this.background = new Background();
    this.text = new Text();

    let self = this;
    this.addEventListener(EventTypes.keyDown, function(source, args){
        switch (args.key) {
            case "Shift":
            case "Meta":
            case "ArrowLeft":
            case "ArrowRight":
            case "ArrowUp":
            case "ArrowDown":
                break;
            case "Backspace":
                self.setText(self.getText().slice(0, -1));
                self.invalidate();
                break;
            default:
                self.setText(self.getText() + args.key);
                self.invalidate();
                break;

        }
    });
}

TextField.prototype = Object.assign( Object.create( View.prototype ), {

    constructor: TextField,

    setBounds: function(bounds){
        this.bounds = bounds;
        this.border.setBounds(new Bounds(0,0, this.bounds.w, this.bounds.h));
        this.background.setBounds(new Bounds(
            this.border.lineWidth/2,
            this.border.lineWidth/2,
            this.bounds.w - this.border.lineWidth,
            this.bounds.h - this.border.lineWidth));
        this.text.setAlign("left");
        this.text.setBaseline("middle");
        this.text.setPosition(
             10,
             this.bounds.h/2);
        return this;
    },

    getBounds : function(){
        return this.bounds;
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

    setTextColor: function(color){
        this.text.setColor(color);
        return this;
    },

    getTextColor: function(){
        return this.text.getColor();
    },

    setText: function(text){
        this.text.setText(text);
        return this;
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

    setBackgroundColor: function(color){
        this.background.setColor(color);
        return this;
    },

    getBackgroundColor: function(){
        return this.background.getColor();
    },

    setBorderRounded: function(rounded){
        this.border.setRounded(rounded);
        return this;
    },

    getBorderRounded: function(){
        return this.border.getRounded();
    },

    paint: function(g, r){
        r = r || this.bounds;

        this.background.paint(g, r);
        this.border.paint(g, r);
        this.text.paint(g, r);
    },
});

export {TextField};