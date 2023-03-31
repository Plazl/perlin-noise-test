const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const noise = (x, y) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const A = p[X] + Y;
    const B = p[X + 1] + Y;
    return lerp(v, lerp(u, grad(p[A], x, y), grad(p[B], x - 1, y)), lerp(u, grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1)));
};

const fade = (t) => t * t * (t * (t * 6 - 15) + 10);

const lerp = (t, a, b) => a + t * (b - a);

const grad = (hash, x, y) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
};

const p = new Array(512);
for (let i = 0; i < 256; i++) {
    p[i] = p[i + 256] = Math.floor(Math.random() * 256);
}

for (let x = 0; x < 512; x++) {
    for (let y = 0; y < 512; y++) {
        const value = Math.floor(noise(x / 32, y / 32) * 256);
        ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
        ctx.fillRect(x, y, 1, 1);
    }
}
