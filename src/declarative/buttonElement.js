import {ViewElement} from "./viewElement";
import {Button} from "../views/button";

class ButtonElement extends ViewElement{

    constructor() {
        super();
        this.buiView = new Button();
    }

    connectedCallback() {
        super.connectedCallback();

        for(let attr of this.attributes){
            switch (attr.name) {

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

export {ButtonElement};