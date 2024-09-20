class SkeletonEditor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.segments = [];

        this.selectedParticle = null;
        this.hoveredParticle = null;
        this.dragging = false;
        this.mouse = null;

        this.#addEventListener();
    }

    #addEventListener() {
        this.canvas.addEventListener('mousedown', (evt) => {
            if (evt.button === 0) { // left click
                if (this.hoveredParticle) {
                    this.#select(this.hoveredParticle);
                    this.dragging = true;
                    return;
                }
                const p = new Particle(this.mouse);
                this.particles.push(p);
                this.#select(p);
                this.hoveredParticle = p;
            }

            if (evt.button === 2) { // right click
                if (this.selectedParticle) {
                    this.selectedParticle = null;
                }
                else if (this.hoveredParticle) {
                    this.#remove(this.hoveredParticle);
                }
            }
        });

        this.canvas.addEventListener('mousemove', (evt) => {
            this.mouse = this.#getMousePos(evt);
            this.hoveredParticle = this.#getNearestParticle(this.mouse, this.particles);
            if (this.dragging){
                this.selectedParticle.loc.x = this.mouse.x;
                this.selectedParticle.loc.y = this.mouse.y;
                this.selectedParticle.oldLoc.x = this.mouse.x;
                this.selectedParticle.oldLoc.y = this.mouse.y;
                for (const seg of this.segments) {
                    seg.init();
                }
            }
        });

        this.canvas.addEventListener('mouseup', (evt) => {
            this.dragging = false;
        })

        this.canvas.addEventListener("contextmenu", (evt) => {
            evt.preventDefault();
        })
    }

    #select(particle) {
        if (this.selectedParticle){
            this.tryAddSegment(new Segment(this.selectedParticle, particle));
        }
        this.selectedParticle = particle;
    }

    #remove(particle) {
        const segments = this.getSegmentsWithParticle(particle);
        for (const seg of segments){
            this.removeSegment(seg);
        }
        this.particles.splice(this.particles.indexOf(particle), 1);
        this.hoveredParticle = null;
        if (this.selected === particle){
            this.selected = null;
        }
    }

    getSegmentsWithParticle(particle){
        const segments = [];
        for (const seg of this.segments){
            if (seg.includes(particle)){
                segments.push(seg);
            }
        }
        return segments;
    }

    removeSegment(seg){
        this.segments.splice(this.segments.indexOf(seg), 1);
    }

    addSegment(seg){
        this.segments.push(seg);
    }

    containsSegment(seg){
        return this.segments.find((s) => s.equals(seg));
    }

    tryAddSegment(seg){
        if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)){
            this.addSegment(seg);
            return true;
        }
        return false;
    }

    #getMousePos(evt) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    #getNearestParticle(loc, particles, threshold = 10) {
        let minDistance = Number.MAX_SAFE_INTEGER;
        let nearest = null;

        for (const particle of particles) {
            const p = particle.loc;
            const dist = distance(p, loc);
            if (dist < minDistance && dist < threshold) {
                minDistance = dist;
                nearest = particle;
            }
        }

        return nearest;
    }

    reset() {
        this.particles = [];
        this.segments = [];
        this.selectedParticle = null;
    }

    draw() {
        for (const particle of this.particles) {
            particle.draw(this.ctx);
        }
        for (const segment of this.segments) {
            segment.draw(this.ctx);
        }


        if (this.selectedParticle) {
            const ghost = this.hoveredParticle ? this.hoveredParticle : new Particle(this.mouse);
            new Segment(this.selectedParticle, ghost).draw(this.ctx, { dash: [2, 2] });
            this.selectedParticle.draw(this.ctx, { outline: true });
        }

        if (this.hoveredParticle) {
            this.hoveredParticle.draw(this.ctx, { fill: true });
        }
    }
}