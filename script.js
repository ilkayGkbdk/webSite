const canvas = document.getElementById("myCanvas");
canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext("2d");

const p1 = new Particle({ x: 200, y: 200 }, -3);
const p2 = new Particle({ x: 300, y: 200 }, -5);
const s1 = new Segment(p1, p2);

const floorY = canvas.height * 0.9;

const skeletonEditor = new SkeletonEditor(canvas);
const physics = new Physics([p1, p2], [s1], floorY);

animate();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    physics.update(ctx);
    // floor
    ctx.beginPath();
    ctx.moveTo(0, floorY);
    ctx.lineTo(canvas.width, floorY);
    ctx.stroke();
    skeletonEditor.draw();

    requestAnimationFrame(animate);
}

function addPhysicsToSkeleton() {
    physics.particles = physics.particles.concat(skeletonEditor.particles);
    physics.segments = physics.segments.concat(skeletonEditor.segments);
    skeletonEditor.reset();
}