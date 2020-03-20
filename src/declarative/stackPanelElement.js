import {ViewElement} from "./viewElement";
import {StackPanel} from "../views/stackPanel";

class StackPanelElement extends ViewElement{

    constructor() {
        super();
        this.buiView = new StackPanel();
    }

    connectedCallback() {
        super.connectedCallback();

        for(let attr of this.attributes){
            switch (attr.name) {
                case 'stack-style':
                    this.style = attr.value;
                    break;

                case 'padding':
                    this.padding = attr.value;
                    break;
            }
        }
    }

    set style(val){
        if(val){
            this.buiView.setStyle(val);
        }
    }

    get style(){
        return this.buiView.getStyle();
    }

    set padding(val){
        if(val){
            this.buiView.setPadding(Number(val));
        }
    }

    get padding(){
        return this.buiView.getPadding();
    }
}
window.customElements.define('bui-stack-panel', StackPanelElement);

export {StackPanelElement};