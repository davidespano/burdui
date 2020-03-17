const EventTypes = {
    paint: 0,
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