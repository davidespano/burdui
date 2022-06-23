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

export {Bounds};