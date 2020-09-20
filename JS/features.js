const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
const pi = Math.PI;
console.log(canvas.height)
const minHeight = window.innerHeight * (1 / 10);
const maxHeight = window.innerHeight;

function randomColor() {
    var values = "1234567890ABCDEF";
    var val = values.split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += val[Math.floor(Math.random() * 16)];
    }
    if (color == '#000000') {
        return '#ffffff';
    } else {
        return color;
    }
}
let mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener('resize', function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //init();
});
window.addEventListener('click', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    initclick();
});
function Bubble(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * pi, false);
        c.lineWidth = 0.3;
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
        c.beginPath();
        c.arc(this.x, this.y, this.radius * (1 - 1 / 10), -pi / 2, pi / 20, false);
        c.rotate(0);
        c.lineWidth = 0.5;
        c.strokeStyle = "#ffffff80";
        c.stroke();
    }
    this.move = function () {
        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let bubbles;
let bubble;
let x, y, dx, dy, radius, color;
function init() {
    bubbles = [];
    for (let i = 0; i < 15; i++) {
        radius = (Math.random() * 25) + 75;
        x = (Math.random() * (canvas.width - 2 * radius)) + radius;
        y = (Math.random() * (canvas.height - 2 * radius)) + radius;
        dx = (Math.random() - 0.5) * 6;
        dy = (Math.random() - 0.5) * 6;
        if (i == 0 || i == 5 || i == 10) { color = '#ffa6eb80'; }
        if (i == 1 || i == 6 || i == 11) { color = '#c4c4c48f'; }
        if (i == 2 || i == 7 || i == 12) { color = '#fffba880'; }
        if (i == 3 || i == 8 || i == 13) { color = '#ffffff80'; }
        if (i == 4 || i == 9 || i == 14) { color = '#ffe38080'; }
        bubble = new Bubble(x, y, dx, dy, radius, color)
        bubbles.push(bubble);
    }
}
let k;
function initclick() {
    radius = (Math.random() * 25) + 75;
    x = mouse.x;
    y = mouse.y;
    dx = (Math.random() - 0.5) * 6;
    dy = (Math.random() - 0.5) * 6;
    k = Math.floor(Math.random() * 10);
    if (k == 0 || k == 5) { color = '#ffa6eb80'; }
    if (k == 1 || k == 6) { color = '#c4c4c48f'; }
    if (k == 2 || k == 7) { color = '#fffba880'; }
    if (k == 3 || k == 8) { color = '#ffffff80'; }
    if (k == 4 || k == 9) { color = '#ffe38080'; }
    bubble = new Bubble(x, y, dx, dy, radius, color)
    bubbles.push(bubble);
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < bubbles.length; j++) {
        bubbles[j].move();
    }
}
init();
animate();

gsap.to("#descriptiveText", { x: 0, stagger: 0.1, duration: 0.75 });
gsap.to("#descriptiveText", { y: 10, stagger: 0.1, duration: 0.5, delay: 0.75 });
