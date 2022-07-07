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
        this.border.setBounds(new Bounds(0,0, this.bounds.w, this.bounds.h));
        this.border.setRadio(10);
        this.background.setRadio(this.border.getRadio());
        this.background.setBounds(new Bounds(
            this.border.lineWidth/2,
            this.border.lineWidth/2,
            this.bounds.w - this.border.lineWidth,
            this.bounds.h - this.border.lineWidth));
        this.text.setAlign("left");
        this.text.setBaseline("middle");
        this.text.setPosition(
            this.background.getRadio()+20,
            this.bounds.h/2);
        return this;
    },

    getBounds : function(){
        return this.bounds;
    },

    seleccionar : function(source){
        if(this.getSelect()===0) {
            this.setBackgroundColor("#000000");
            this.setSelect(1);
            let elementos = document.getElementsByTagName("bui-radiobutton");
            for (let i = 0; i < elementos.length; i++) {
                if (this.name === elementos[i].view.name && this !== elementos[i].view && elementos[i].view.getSelect() === 1) {
                    elementos[i].view.setSelect(0);
                    elementos[i].view.setBackgroundColor("#ffffff");
                    elementos[i].view.invalidate();
                }
            }
        }
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
        this.background.paint2(g, r);
        this.border.paint2(g, r);
        this.text.paint2(g, r);
    }
});
export {radioButton};
