/**
 * @author Davide Spano
 */
import {Event} from "./event";
import {EventTypes} from "./event";
import {Bounds} from "./layout/bounds";

function App(canvas, tree){
    this.canvas = canvas;
    this.g = canvas.getContext('2d');
    this.tree = tree;
    if(this.tree){
        this.tree.parent = this;
    }
    this.q = [];

    //variables for inferring events
    this.pointer = {x: -1, y: -1};
    this.primaryBtn = 0;
    this.secondaryBtn = 0;

    this.moveThreshold = 10;

    this.buttonPressed = -1;

}

Object.assign( App.prototype, {
    start : function(){
        let self = this;
        if(this.tree != null){
            this.tree.paint(this.g);

            // receive the input from the devices

            this.canvas.addEventListener('mousemove', e =>{
                let test = this.hitTest(e);
                if(test.view){
                    let evt = new Event(test.view, EventTypes.mouseMove, test.args);
                    this.q.push(evt);
                }
            });

            this.canvas.addEventListener('mousedown', e =>{
                let test = this.hitTest(e);
                if(test.view){
                    let evt = new Event(test.view, EventTypes.mouseDown, test.args);
                    this.q.push(evt);
                }
            });

            this.canvas.addEventListener('mouseup', e => {
                let test = this.hitTest(e);
                if(test.view){
                    let evt = new Event(test.view, EventTypes.mouseUp, test.args);
                    this.q.push(evt);
                }
            });

            let self = this;
            window.setInterval(function(){
                self.flushQueue();
            }, 100);
        }
    },

    invalidate: function(r, source){
        let evt = new Event(source, EventTypes.paint, {
            time: new Date().getTime(),
            bounds: r
        });
        this.q.push(evt);
    },

    flushQueue: function(){
        let damagedArea = new Bounds(0,0,-1,-1);

        while(this.q.length > 0){
            let evt = this.q.shift();
            switch(evt.type){
                case EventTypes.paint:
                    damagedArea = damagedArea.union(evt.args.bounds);
                    break;

                case EventTypes.mouseMove:
                    evt.source.raise(evt.source, EventTypes.mouseMove, evt.args);
                    this.pointer.x = evt.args.screenX;
                    this.pointer.y = evt.args.screenY;
                    break;

                case EventTypes.mouseDown:
                    evt.source.raise(evt.source, EventTypes.mouseDown, evt.args);
                    if(evt.args.primaryBtn){
                        this.primaryBtn = evt.args.time;
                        this.buttonPressed = 1;
                    }
                    if(evt.args.secondaryBtn){
                        this.secondaryBtn = evt.args.time;
                        this.buttonPressed = 2;
                    }
                    break;

                case EventTypes.mouseUp:
                    evt.source.raise(evt.source, EventTypes.mouseUp, evt.args);
                    if(this.buttonPressed == 1 &&
                        Math.abs(this.pointer.x - evt.args.screenX) < this.moveThreshold &&
                        Math.abs(this.pointer.y - evt.args.screenY) < this.moveThreshold){
                        evt.source.raise(evt.source, EventTypes.mouseClick, evt.args);
                    }
                    if(this.buttonPressed == 2 &&
                        Math.abs(this.pointer.x - evt.args.screenX) < this.moveThreshold &&
                        Math.abs(this.pointer.y - evt.args.screenY) < this.moveThreshold){
                        evt.source.raise(evt.source, EventTypes.mouseClick, evt.args);
                    }
                    this.buttonPressed = -1;
                    break;
            }
        }

        if(damagedArea.w > 0 && damagedArea.h > 0){
            this.tree.paint(this.g, damagedArea);
        }
    },

    hitTest: function(e){
        // getting the point in the canvas coordinates
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        let args = {
            time: new Date().getTime(),
            x : x,
            y : y,
            screenX : x,
            screenY : y,
            primaryBtn : e.buttons == 1,
            secondaryBtn: e.buttons == 2
        };
        let view = this.tunnel(this.tree, x, y, 0, 0, args);
        //console.log(`mouse (${x}, ${y}) on view ${view.name}` );
        return {
            view: view,
            args: args
        };
    },

    tunnel: function(view, x, y, dx, dy, e){
        if(view == null){
            return null;
        }

        let inner = null;
        let rect = new Bounds(
            view.bounds.x + dx,
            view.bounds.y + dy,
            view.bounds.w,
            view.bounds.h
        );
        if(rect.contains(x, y)){
            inner = view;
            e.x = x - dx;
            e.y = y - dy;
        }else{
            return null;
        }

        for(let c of view.children){
            inner = this.tunnel(c, x , y, rect.x, rect.y, e) || inner;
        }

        return inner;
    },

});

export {App};