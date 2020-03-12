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

export {ButtonElement};