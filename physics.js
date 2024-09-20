class Physics {
    static G = { x: 0, y: 0.2 };

    constructor(particles = [], segments = [], floorY) {
        this.particles = particles;
        this.segments = segments;
        this.floorY = floorY;
    }

    update(ctx) {
        for (const particle of this.particles) {
            particle.update();
        }
        for (const segment of this.segments) {
            segment.update();
        }

        for (const particle of this.particles) {
            if (particle.loc.y > this.floorY) {
                particle.loc.y = this.floorY;
            }
        }

        for (const particle of this.particles) {
            particle.draw(ctx);
        }
        for (const segment of this.segments) {
            segment.draw(ctx);
        }
    }
}