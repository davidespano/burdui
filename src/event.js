const EventTypes = {
    paint: 0,
    mouseMove: 1,
    mouseDown: 2,
    mouseUp: 3,
    keyDown: 4,
    keyUp: 5,

    mouseClick: 100,
    mouseDoubleClick: 101,
    mouseEnter: 102,
    mouseLeave: 103,
    getFocus: 104,
    lostFocus:105,
};

function Event(source, type, args){
    this.source = source;
    this.type = type;
    this.args = args;
}

Object.assign(Event.prototype, {


    // methods
    getSource : function(){
        return this.source;
    },

    setSource : function(source) {
        this.source = source;
        return this;
    },

    getType : function(){
        return this.type;
    },

    setType : function(type){
        this.type = type;
        return this;
    },

    getArgs : function(){
        return this.args;
    },

    setArgs : function(args){
        this.args = args;
        return this;
    },

});

export {Event};
export {EventTypes};