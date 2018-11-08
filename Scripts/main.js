//Flames to spawn in one frame
const flamesPerFrame = 2;

let canvas, ctx;

let isMouseDown = false;
let x, y;

let pixels = [];
let flames = [];

//initialise variables and get DOM elements
async function setup() {
	x = 0;
	y = 0;
	canvas = document.getElementById('maincanvas');
	ctx = canvas.getContext('2d');
	await fitCanvas();
	animate();
}

//If window is resized then refit the canvas to fill
//The window
async function fitCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//Main loop
async function animate() {
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.textAlign = 'center';
	ctx.font = '30px Helvetica';
	ctx.fillStyle = '#FFFFFF44';
	ctx.fillText('Click and hold to create flame', canvas.width / 2, canvas.height / 2-15);
	ctx.fillText('Press any key to change flame colour', canvas.width / 2, canvas.height / 2 + 15);
	update();
	draw();
	requestAnimationFrame(animate);
}

//Main game logic loop
function update() {
	if (isMouseDown) {
		for (var i = 0; i < flamesPerFrame; i++) {
			flames.push(new Flame(x, y));
		}
	}

	for (var i = flames.length - 1; i >= 0; i--) {
		if (flames[i].done) {
			flames.splice(i, 1);
		} else {
			flames[i].update();
		}
	}
}

//Main draw loop
function draw() {
	for (var i = 0; i < flames.length; i++) {
		flames[i].draw();
	}
}

document.onload = setup();

//Setup all input events
window.addEventListener('resize', fitCanvas);
window.addEventListener('mousedown', async function(e) {
	x = e.pageX;
	y = e.pageY;
	isMouseDown = true;
});
window.addEventListener('mouseup', async function() {
	isMouseDown = false;
});
window.addEventListener('mousemove', async function(e) {
	if (isMouseDown) {
		x = e.pageX;
		y = e.pageY;
	}
});
window.addEventListener('keydown', shiftFlameColour);