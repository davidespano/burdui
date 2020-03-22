/**
 * @author Davide Spano
 */
import {View} from "./view";
import {Bounds} from "../layout/bounds";

function GridPanel(){
    View.call(this);
    this.padding = 0;
    this.rows = 0;
    this.cols = 0;
}

GridPanel.prototype = Object.assign( Object.create( View.prototype ), {

    constructor: GridPanel,

    setRows: function(rows){
        this.rows = rows;
        this.updateBounds();
        return this;
    },

    getRows: function(){
        return this.rows;
    },

    setCols: function(cols){
        this.cols = cols;
        this.updateBounds();
        return this;
    },

    getCols: function(){
        return this.cols;
    },

    setBounds: function (bounds){
        View.prototype.setBounds.call(this, bounds);
        this.updateBounds();
        return this;
    },

    addChild: function(child, row, col, rowSpan, colSpan){
        row = row || child.row || 0;
        col = col || child.col || 0;
        rowSpan = rowSpan || child.rowSpan || 1;
        colSpan = colSpan || child.colSpan || 1;

        if(row < 0) row = 0;
        if(col < 0) col = 0;
        if(row >= this.rows) row = this.rows -1;
        if(col >= this.cols) col = this.cols - 1;
        if(rowSpan < 1) rowSpan = 1;
        if(colSpan < 1) colSpan = 1;

        child.row = row;
        child.col = col;
        child.rowSpan = rowSpan;
        child.colSpan = colSpan;

        View.prototype.addChild.call(this, child);
        this.updateBounds();

        return this;
    },


    setPadding: function(padding){
        this.padding = padding;
        return this;
    },

    getPadding: function(){
        return this.padding;
    },

    updateBounds: function(){
        let rh = this.bounds.h / this.rows;
        let cw = this.bounds.w / this.cols;
        for(let i in this.children) {
            let c = this.children[i];
            let b = new Bounds(
                c.col * cw,
                c.row * rh,
                cw * c.colSpan,
                rh * c.rowSpan,
            );
            c.setBounds(b);

        }
    },

});

export {GridPanel};