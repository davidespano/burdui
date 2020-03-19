(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.burdui = {}));
}(this, (function (exports) { 'use strict';

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

	/**
	 * @author Davide Spano
	 */

	function Bounds(x, y, w, h){
	    this.x = x || 0;
	    this.y = y || 0;
	    this.w = w || 0;
	    this.h = h || 0;
	}

	Object.assign( Bounds.prototype, {
	    set : function(x, y, w, h){
	        this.x = x;
	        this.y = y;
	        this.w = w;
	        this.h = h;
	        return this;
	    },

	    setX : function(x){
	        this.x = x;
	        return this;
	    },

	    setY : function(y){
	        this.y = y;
	        return this;
	    },

	    setW : function(w){
	        this.w = w;
	        return this;
	    },

	    setH : function(h){
	        this.h = h;
	        return this;
	    },

	    /**
	     * Calculates the intersection between two Bounds object,
	     * which is the maximum rectangular area shared by both of them.
	     * @param r the Bounds object to intersect
	     * @returns {Bounds|null} a Bounds object representing the
	     * intersection or null in case of error.
	     */
	    intersection : function(r){
	        if (! r instanceof Bounds){
	            return null;
	        }
	        let tx1 = this.x;
	        let ty1 = this.y;
	        let rx1 = r.x;
	        let ry1 = r.y;
	        let tx2 = tx1; tx2 += this.w;
	        let ty2 = ty1; ty2 += this.h;
	        let rx2 = rx1; rx2 += r.w;
	        let ry2 = ry1; ry2 += r.h;
	        if (tx1 < rx1) tx1 = rx1;
	        if (ty1 < ry1) ty1 = ry1;
	        if (tx2 > rx2) tx2 = rx2;
	        if (ty2 > ry2) ty2 = ry2;
	        tx2 -= tx1;
	        ty2 -= ty1;
	        return new Bounds(tx1, ty1, tx2, ty2);
	    },

	    /**
	     * Calculates the union between two Bounds object,
	     * which is the minimum rectangular area including  both of them.
	     * @param r the Bounds object to unite
	     * @returns {Bounds|null} a Bounds object representing the
	     * union or null in case of error.
	     */
	    union: function(r){
	        if (! r instanceof Bounds){
	            return null;
	        }
	        let tx2 = this.w;
	        let ty2 = this.h;
	        if ((tx2 | ty2) < 0) {
	            // This rectangle has negative dimensions...
	            // we return the other Bounds object
	            return new Bounds(r.x, r.y, r.w, r.h);
	        }
	        let rx2 = r.w;
	        let ry2 = r.h;
	        if ((rx2 | ry2) < 0) {
	            return new Bounds(this.x, this.y, this.w, this.h);
	        }
	        let tx1 = this.x;
	        let ty1 = this.y;
	        tx2 += tx1;
	        ty2 += ty1;
	        let rx1 = r.x;
	        let ry1 = r.y;
	        rx2 += rx1;
	        ry2 += ry1;
	        if (tx1 > rx1) tx1 = rx1;
	        if (ty1 > ry1) ty1 = ry1;
	        if (tx2 < rx2) tx2 = rx2;
	        if (ty2 < ry2) ty2 = ry2;
	        tx2 -= tx1;
	        ty2 -= ty1;
	        return new Bounds(tx1, ty1, tx2, ty2);
	    },

	    /**
	     * Checks whether a point is inside the Bounds or not
	     * @param X the x coordinate of the point
	     * @param Y the y coordinate of the point
	     * @returns {boolean} true if the point is inside, false otherwise
	     */
	    contains : function(X, Y){
	        let w = this.w;
	        let h = this.h;
	        if((w | h) < 0){
	            return false;
	        }
	        let x = this.x;
	        let y = this.y;
	        if (X < x || Y < y){
	            return false;
	        }
	        w += x;
	        h += y;
	        //      overflow || intersect
	        return ((w < x || w > X) &&
	                (h < y || h > Y));
	    },




	});

	/**
	 * @author Davide Spano
	 */

	function App(canvas, tree){
	    this.canvas = canvas;
	    this.g = canvas.getContext('2d');
	    // create secondary canvas for emulating double buffering
	    this.secondaryCanvas = this.canvas.cloneNode();
	    this.g2 = this.secondaryCanvas.getContext('2d');
	    this.tree = tree;
	    if(this.tree){
	        this.tree.parent = this;
	    }
	    this.q = [];
	}

	Object.assign( App.prototype, {
	    start : function(){
	        let self = this;
	        if(this.tree != null){
	            this.tree.paint(this.g2);
	            // simulating flickering
	            window.setTimeout(function(){
	                self.tree.paint(self.g2);
	            }, 500);

	            window.setTimeout(function(){
	                self.g.drawImage(self.secondaryCanvas, 0, 0);
	            }, 700);

	        }
	    },

	    invalidate: function(r, source){
	        let evt = new Event(source, EventTypes.paint, {bounds: r});
	        this.q.push(evt);
	    },

	    flushQueue: function(){
	        let damagedArea = new Bounds(0,0,-1,-1);

	        while(this.q.length > 0){
	            let evt = this.q.pop();
	            switch(evt.type){
	                case EventTypes.paint:
	                    damagedArea = damagedArea.union(evt.args.bounds);
	                    break;
	            }
	        }

	        let self = this;
	        if(damagedArea.w > 0 && damagedArea.h > 0){
	            this.tree.paint(this.g2, damagedArea);
	            // simulating flickering
	            window.setTimeout(function(){
	                self.tree.paint(self.g2, damagedArea);
	            }, 500);

	            window.setTimeout(function(){
	                self.g.drawImage(self.secondaryCanvas, 0, 0);
	            }, 700);
	        }
	    }

	});

	let Utils = {
	    createRoundedRect: function (g, rounded, b) {
	        const halfRadians = (2 * Math.PI) / 2;
	        const quarterRadians = (2 * Math.PI) / 4;
	        let bounds = new Bounds(
	            b.x + g.lineWidth,
	            b.y + g.lineWidth,
	            b.w - 2 * g.lineWidth,
	            b.h - 2 * g.lineWidth);
	        g.beginPath();
	        // top left arc
	        g.arc(rounded + bounds.x,
	            rounded + bounds.y,
	            rounded, -quarterRadians, halfRadians, true);

	        // line from top left to bottom left
	        g.lineTo(bounds.x, bounds.y + bounds.h - rounded);

	        // bottom left arc
	        g.arc(rounded + bounds.x,
	            bounds.h - rounded + bounds.y,
	            rounded, halfRadians, quarterRadians, true);

	        // line from bottom left to bottom right
	        g.lineTo(bounds.x + bounds.w - rounded,
	            bounds.y + bounds.h);

	        // bottom right arc
	        g.arc(bounds.x + bounds.w - rounded,
	            bounds.y + bounds.h - rounded,
	            rounded, quarterRadians, 0, true);

	        // line from bottom right to top right
	        g.lineTo(bounds.x + bounds.w, bounds.y + rounded);

	        // top right arc
	        g.arc(bounds.x + bounds.w - rounded,
	            bounds.y + rounded, rounded, 0, -quarterRadians, true);

	        // line from top right to top left
	        g.lineTo(bounds.x + rounded, bounds.y);
	        g.closePath();
	    },
	};

	/**
	 * @author Davide Spano
	 */

	function Background(bounds, color, rounded){
	    this.bounds = bounds || new Bounds();
	    this.color = color || "white";
	    this.rounded = rounded || 0;
	}
	Object.assign( Background.prototype, {
	    setColor : function(color){
	        this.color = color;
	        return this;
	    },

	    getColor: function(){
	        return this.color;
	    },

	    setBounds : function(bounds){
	        this.bounds = bounds;
	        return this.bounds;
	    },

	    getBounds : function(){
	        return this.bounds;
	    },

	    setRounded : function(rounded){
	        this.rounded = rounded;
	        return this;
	    },

	    paint : function(g, r){
	        g.save();
	        g.beginPath();
	        g.rect(r.x, r.y, r.w, r.h);
	        g.closePath();
	        g.clip();
	        g.fillStyle = this.color;
	        g.beginPath();
	        Utils.createRoundedRect(g, this.rounded, this.bounds);
	        g.closePath();
	        g.fill();
	        g.restore();
	    }
	});

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

	    paint: function(g, r){
	        g.save();
	        g.beginPath();
	        g.rect(r.x, r.y, r.w, r.h);
	        g.clip();
	        g.font = this.font;
	        g.fillStyle = this.color;
	        g.textAlign = this.align;
	        g.textBaseline = this.baseline;
	        g.fillText(this.text, this.x, this.y);
	        g.restore();
	    }
	});

	/**
	 * @author Davide Spano
	 */

	function Border( bounds, color, lineWidth, rounded){
	    this.color = color || "black";
	    this.bounds = bounds || new Bounds();
	    this.rounded = rounded || 0;
	    this.lineWidth = lineWidth || 1;
	}

	Object.assign( Border.prototype, {

	    setColor : function(color){
	        this.color = color;
	        return this;
	    },

	    getColor: function(){
	        return this.color;
	    },

	    setLineWidth : function(width){
	        this.lineWidth = width;
	        return this;
	    },

	    getLineWidth: function(){
	        return this.lineWidth;
	    },

	    setBounds : function(bounds){
	        this.bounds = bounds;
	        return this.bounds;
	    },

	    getBounds : function(){
	        return this.bounds;
	    },

	    setRounded : function(rounded){
	        this.rounded = rounded;
	        return this;
	    },

	    getRounded : function(){
	        return this.rounded;
	    },

	    paint : function(g, r){


	        g.save();
	        g.beginPath();
	        g.rect(r.x, r.y, r.w, r.h);
	        g.clip();
	        g.strokeStyle = this.color;
	        g.lineWidth = this.lineWidth;
	        Utils.createRoundedRect(g, this.rounded, this.bounds);
	        g.stroke();
	        g.restore();
	    },

	});

	/**
	 * @author Davide Spano
	 */

	function View(){
	    this.bounds = new Bounds();
	    this.name = "";
	    this.children = [];
	    this.isView = true;
	    this.parent = null;
	}

	Object.assign(View.prototype, {
	    setBounds : function(bounds){
	        this.bounds = bounds;
	        return this;
	    },

	    getBounds : function(){
	        return this.bounds;
	    },

	    setName : function(name){
	        this.name = name;
	        return this;
	    },

	    getName : function(){
	        return name;
	    },

	    addChild: function(c){
	        if(!c){
	            return this;
	        }
	        if(c.isView){
	            this.children.push(c);
	            c.parent = this;
	        }
	        return this;
	    },


	    paintChildren: function(g, b){
	        let r = b || this.bounds;

	        for(let c of this.children){
	            let intersection = c.bounds.intersection(r);
	            if(intersection.w > 0 && intersection.h > 0){
	                // the children is in the damaged area
	                g.save();
	                g.translate(c.bounds.x, c.bounds.y);
	                intersection.setX(intersection.x - c.bounds.x);
	                intersection.setY(intersection.y - c.bounds.y);
	                c.paint(g, intersection);
	                g.restore();
	            }
	        }
	    },

	    paint: function(g, b){
	        let r = b || this.bounds;

	        g.save();
	        // setting the clipping region. The view cannot draw outside its bounds
	        g.beginPath();
	        g.rect(r.x, r.y, r.w, r.h);
	        g.clip();

	        g.strokeStyle = "black";
	        g.strokeRect(
	            0,
	            0,
	            this.bounds.w,
	            this.bounds.h);

	        // draw the children views.
	        this.paintChildren(g,r);
	        g.restore();

	    },

	    invalidate : function(r, source){
	        source = source || this;
	        if(this.parent != null){
	            // move to the parent reference system
	            let damagedArea = new Bounds(
	                this.bounds.x + r.x,
	                this.bounds.y + r.y,
	                r.w, r.h);
	            // intersect the requested area with the current bounds
	            damagedArea = damagedArea.intersection(this.bounds);

	            // bubble up the request to the parent
	            this.parent.invalidate(damagedArea, source);
	        }
	    }
	});

	/**
	 * @author Davide Spano
	 */

	function Button(bounds){
	    View.call(this);
	    this.bounds = bounds || new Bounds();
	    this.border = new Border();
	    this.background = new Background();
	    this.text = new Text();
	    this.flickerCount = 0;
	}

	Button.prototype = Object.assign( Object.create( View.prototype ), {

	    constructor: Button,

	    setBounds: function(bounds){
	        this.bounds = bounds;
	        this.border.setBounds(new Bounds(0,0, this.bounds.w, this.bounds.h));
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

	    setBorderRounded: function(rounded){
	        this.border.setRounded(rounded);
	        this.background.setRounded(rounded);
	        return this;
	    },

	    getBorderRounded: function(){
	        return this.border.getRounded();
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

	    paint: function(g, r){
	        r = r || this.bounds;
	        if(this.flickerCount == 0){
	            this.background.paint(g, r);
	        }else {
	            this.border.paint(g, r);
	            this.text.paint(g, r);
	        }

	        this.flickerCount = (this.flickerCount + 1) % 2;


	    },
	});

	/**
	 * @author Emanuele Concas
	 */

	function TextField(bounds, text){
	    View.call(this);
	    this.bounds = bounds || new Bounds();
	    this.border = new Border();
	    this.background = new Background();
	    this.text = new Text(text);
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

	    paint: function(g){
	        this.background.paint(g);
	        this.border.paint(g);
	        this.text.paint(g);
	    },
	});

	/**
	 * @author Davide Spano
	 */

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

	class ViewElement extends HTMLElement{

	    constructor() {
	        super();
	        this.buiView = new View();

	    }

	    connectedCallback(){
	        const self = this;
	        var observer = new MutationObserver(function(mutations) {
	            mutations.forEach(function(mutation) {
	                //Detect <img> insertion
	                if (mutation.addedNodes.length){
	                    const child = mutation.addedNodes[0];
	                    if(child.buiView && child.buiView.isView){
	                        self.buiView.addChild(child.buiView);
	                    }
	                }

	            });
	        });

	        observer.observe(this, { childList: true });

	        for(let attr of this.attributes){
	            switch(attr.name){
	                case 'x':
	                    this.x = attr.value;
	                    break;
	                case 'y':
	                    this.y = attr.value;
	                    break;
	                case 'w':
	                    this.w = attr.value;
	                    break;
	                case 'h':
	                    this.h = attr.value;
	                    break;
	                case 'name':
	                    this.name = attr.value;
	                    break;
	            }

	        }
	    }

	    set name(val){
	        if(val){
	            this.buiView.setName(val);
	        }
	    }

	    get name(){
	        return this.buiView.getName();
	    }

	    set x(val){
	        if(val){
	            this.buiView.getBounds().setX(Number(val));
	            this.buiView.setBounds(this.buiView.bounds);
	        }
	    }

	    get x(){
	        return this.buiView.getBounds().x;
	    }

	    set y(val){
	        if(val){
	            this.buiView.bounds.setY(Number(val));
	            this.buiView.setBounds(this.buiView.bounds);
	        }
	    }

	    get y(){
	        return this.buiView.getBounds().y;
	    }

	    set w(val){
	        if(val){
	            this.buiView.bounds.setW(Number(val));
	            this.buiView.setBounds(this.buiView.bounds);
	        }
	    }

	    get w(){
	        return this.buiView.getBounds().getW();
	    }

	    set h(val){
	        if(val){
	            this.buiView.bounds.setH(Number(val));
	            this.buiView.setBounds(this.buiView.bounds);
	        }
	    }

	    get h(){
	        return this.buiView.getBounds().h;
	    }


	}

	window.customElements.define('bui-view', ViewElement);

	class ButtonElement extends ViewElement{

	    constructor() {
	        super();
	        this.buiView = new Button();
	    }

	    connectedCallback() {
	        super.connectedCallback();

	        for(let attr of this.attributes){
	            switch (attr.name) {
	                case 'background-color':
	                    this.backgroundColor = attr.value;
	                    break;

	                case 'border-line-width':
	                    this.borderLineWidth = attr.value;
	                    break;

	                case 'border-rounded':
	                    this.borderRounded = attr.value;
	                    break;

	                case 'border-color':
	                    this.borderColor = attr.value;
	                    break;

	                case 'font':
	                    this.font = attr.value;
	                    break;

	                case 'text':
	                    this.text = attr.value;
	                    break;

	                case 'text-color':
	                    this.textColor = attr.value;
	                    break;
	            }
	        }
	    }

	    set backgroundColor(val){
	        if(val){
	            this.buiView.setBackgroundColor(val);
	        }
	    }

	    get backgroundColor(){
	        return this.buiView.getBackgroundColor();
	    }

	    set borderLineWidth(val){
	        if(val){
	            this.buiView.setBorderLineWidth(Number(val));
	        }
	    }

	    get borderLineWidth(){
	        return this.buiView.getBorderLineWidth();
	    }

	    set borderColor(val){
	        if(val){
	            this.buiView.setBorderColor(val);
	        }
	    }

	    get borderColor(){
	        return this.buiView.getBorderColor();
	    }

	    set borderRounded(val){
	        if(val){
	            this.buiView.setBorderRounded(Number(val));
	        }
	    }

	    get borderRounded(){
	        return this.buiView.getBorderRounded();
	    }

	    set text(val){
	        if(val){
	            this.buiView.setText(val);
	        }
	    }

	    get text(){
	        return this.buiView.getText();
	    }

	    set textColor(val){
	        if(val){
	            this.buiView.setTextColor(val);
	        }
	    }

	    get textColor(){
	        return this.buiView.getTextColor();
	    }

	    set font(val){
	        if(val){
	            this.buiView.setFont(val);
	        }
	    }

	    get font(){
	        return this.buiView.getFont();
	    }
	}

	window.customElements.define('bui-button', ButtonElement);

	class StackPanelElement extends ViewElement{

	}
	window.customElements.define('bui-stack-panel', StackPanelElement);

	exports.App = App;
	exports.Background = Background;
	exports.Border = Border;
	exports.Bounds = Bounds;
	exports.Button = Button;
	exports.ButtonElement = ButtonElement;
	exports.StackPanel = StackPanel;
	exports.StackPanelElement = StackPanelElement;
	exports.TextField = TextField;
	exports.Text = Text;
	exports.View = View;
	exports.ViewElement = ViewElement;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
