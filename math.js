function add(p1, p2) {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y
    };
}

function subtract(p1, p2) {
    return {
        x: p1.x - p2.x,
        y: p1.y - p2.y
    };
}

function scale(p, scalar) {
    return {
        x: p.x * scalar,
        y: p.y * scalar
    }
}

function normalize(p) {
    const mag = magnitude(p);
    return scale(p, 1 / mag);
}

function magnitude(p) {
    return distance(p, { x: 0, y: 0 });
}

function distance(p1, p2) {
    return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** 0.5;
}