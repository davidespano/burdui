/**
 * @author Davide Spano
 */

import {View} from "./view";
import {Border} from "../layout/border";
import {Background} from "../layout/background";
import {Bounds} from "../layout/bounds";
import {Text} from "../layout/text";

function radioButton(bounds){
    View.call(this);
    this.bounds = bounds || new Bounds();
    this.border = new Border();
    this.background = new Background();
    this.text = new Text();
    this.flickerCount = 0;
    this.selecte=0;
}

radioButton.prototype = Object.assign( Object.create( View.prototype ), {

    constructor: radioButton,

      setBounds: function(bounds){
        this.bounds = bounds;
        this.border.setBounds(new Bounds(0,0, 30, 30));
        this.background.setBounds(new Bounds(0,0,25,25));
        this.text.setAlign("left");
        this.text.setBaseline("middle");
        this.text.setPosition(
             35,
             30/2);
        return this;
    },

    getBounds : function(){
        return this.bounds;
    },

    setTextColor: function(color){
        this.text.setColor(color);
        return this;
    },
    setClick: function(){
        this.flickerCount++;
        return this;
    },
    getClick: function(){
        return this.flickerCount;
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
    setSelect: function(num){
        this.selecte=num;
        return this;
    },

    getSelect: function(){
        return this.selecte;
    },

    paint: function(g, r){
        r = r || this.bounds;
        this.background.paint(g, r);
        this.border.paint(g, r);
        this.text.paint(g, r);
    }
});

export {radioButton};
