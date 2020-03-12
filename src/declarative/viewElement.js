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


}

window.customElements.define('bui-view', ViewElement);

export {ViewElement};