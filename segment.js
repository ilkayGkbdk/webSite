class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.init();
    }

    init() {
        this.length = distance(this.p1.loc, this.p2.loc);
    }

    equals(other) {
        return this.includes(other.p1) && this.includes(other.p2);
    }

    includes(particle) {
        return this.p1.equals(particle) || this.p2.equals(particle);
    }

    update() {
        const sub = subtract(this.p1.loc, this.p2.loc);
        const mag = magnitude(sub);
        const diff = mag - this.length;

        const norm = normalize(sub);

        this.p1.loc = add(this.p1.loc, scale(norm, -diff / 2));
        this.p2.loc = add(this.p2.loc, scale(norm, diff / 2));

        const sub2 = subtract(this.p1.loc, this.p2.loc);
        const mag2 = magnitude(sub2);
    }

    draw(ctx, {width = 1, color = "black", dash = [], cap = "butt"} = {}) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineCap = cap;
        ctx.setLineDash(dash);
        ctx.moveTo(this.p1.loc.x, this.p1.loc.y);
        ctx.lineTo(this.p2.loc.x, this.p2.loc.y);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}