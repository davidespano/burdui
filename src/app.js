/**
 * @author Davide Spano
 */

function App(canvas, tree){
    this.canvas = canvas;
    this.g = canvas.getContext('2d');
    this.tree = tree;
}

Object.assign( App.prototype, {
    start : function(){
        if(this.tree != null){
            this.tree.paint(this.g);
        }
    }
});

export {App};