/**
 * @author Davide Spano
 */

function Text(text, font){
    this.text = text || "";
    this.font = font || "30px Arial";
    this.align = "center";
    this.baseline = "middle";
    this.color = "black;";
    this.x = 0;
    this.y = 0;
}

Object.assign( Text.prototype, {
    setText : function(text){
        this.text = text;
        return this;
    },

    getText : function(){
        return this.text;
    },

    setAlign : function(align){
        this.align = align;
        return this;
    },

    getAlign : function(){
        return this.align;
    },

    setBaseline : function(baseline){
        this.baseline = baseline;
        return this;
    },

    getBaseline : function(){
        return this.baseline;
    },

    setFont : function(font){
        this.font = font;
        return this;
    },

    getFont : function(){
        return this.font;
    },

    setPosition: function(x, y){
        this.x = x;
        this.y = y;
        return this;
    },

    getPosition: function(){
        return {x: this.x, y: this.y};
    },
    setColor : function(color){
        this.color = color;
        return this;
    },

    getColor: function(){
        return this.color;
    },

    paint: function(g){
        g.save();
        g.font = this.font;
        g.fillStyle = this.color;
        g.textAlign = this.align;
        g.textBaseline = this.baseline;
        g.fillText(this.text, this.x, this.y);
        g.restore();
    }
});

export {Text};