import {Bounds} from "./bounds";
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
            bounds.y + rounded, rounded, 0, -quarterRadians, true)

        // line from top right to top left
        g.lineTo(bounds.x + rounded, bounds.y);
        g.closePath();
    },
};

export {Utils};
