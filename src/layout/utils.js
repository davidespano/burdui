
function createRoundedRect(g, rounded, bounds){
    const halfRadians = (2 * Math.PI)/2;
    const quarterRadians = (2 * Math.PI)/4;
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
}

export {createRoundedRect}