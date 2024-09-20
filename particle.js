class Particle {
    constructor(loc, delta = 0) {
        this.loc = loc;
        this.oldLoc = { x: this.loc.x + delta, y: this.loc.y - delta };
    }

    equals(other) {
        return this.loc.x === other.loc.x && this.loc.y === other.loc.y;
    }

    update() {
        const vel = subtract(this.loc, this.oldLoc);
        const newLoc = add(Physics.G, add(this.loc, vel));
        this.oldLoc = this.loc;
        this.loc = newLoc;
    }

    draw(ctx, { size = 10, color = "black", outline = false, fill = false } = {}){
        const radius = size / 2;

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.loc.x, this.loc.y, radius, 0, 2 * Math.PI);
        ctx.fill();

        if (outline){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.arc(this.loc.x, this.loc.y, radius * 0.6, 0, 2 * Math.PI);
            ctx.stroke();
        }

        if (fill){
            ctx.beginPath();
            ctx.arc(this.loc.x, this.loc.y, radius * 0.4, 0, 2 * Math.PI);
            ctx.fillStyle = "yellow";
            ctx.fill();
        }
    }
}