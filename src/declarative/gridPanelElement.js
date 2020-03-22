import {ViewElement} from "./viewElement";
import {GridPanel} from "../views/gridPanel";

class GridPanelElement extends ViewElement{

    constructor() {
        super();
        this.buiView = new GridPanel();
    }

    connectedCallback() {
        super.connectedCallback();

        for(let attr of this.attributes){
            switch (attr.name) {
                case 'rows':
                    this.rows = attr.value;
                    break;

                case 'cols':
                    this.cols = attr.value;
                    break;

                case 'padding':
                    this.padding = attr.value;
                    break;
            }
        }
    }

    set rows(val){
        if(val){
            this.buiView.setRows(Number(val));
        }
    }

    get rows(){
        return this.buiView.getRows();
    }

    set cols(val){
        if(val){
            this.buiView.setCols(Number(val));
        }
    }

    get cols(){
        return this.buiView.getCols();
    }
}
window.customElements.define('bui-grid-panel', GridPanelElement);

export {GridPanelElement};