import {View} from "../views/view";

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

            })
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

                    // trick for managing grid panels
                case 'row':
                    this.buiView.row = Number(attr.value);
                    break;

                case 'col':
                    this.buiView.col = Number(attr.value);
                    break;

                case 'row-span':
                    this.buiView.rowSpan = Number(attr.value);
                    break;

                case 'col-span':
                    this.buiView.colSpan = Number(attr.value);
                    break;
            }

        }
    }

    get view(){
        return this.buiView;
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
            this.buiView.setBounds(this.buiView.bounds)
        }
    }

    get x(){
        return this.buiView.getBounds().x;
    }

    set y(val){
        if(val){
            this.buiView.bounds.setY(Number(val));
            this.buiView.setBounds(this.buiView.bounds)
        }
    }

    get y(){
        return this.buiView.getBounds().y;
    }

    set w(val){
        if(val){
            this.buiView.bounds.setW(Number(val));
            this.buiView.setBounds(this.buiView.bounds)
        }
    }

    get w(){
        return this.buiView.getBounds().getW();
    }

    set h(val){
        if(val){
            this.buiView.bounds.setH(Number(val));
            this.buiView.setBounds(this.buiView.bounds)
        }
    }

    get h(){
        return this.buiView.getBounds().h;
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

    set borderRounded(val){
        if(val){
            this.buiView.setBorderRounded(Number(val));
        }
    }

    get borderRounded(){
        return this.buiView.getBorderRounded();
    }


}

window.customElements.define('bui-view', ViewElement);

export {ViewElement};