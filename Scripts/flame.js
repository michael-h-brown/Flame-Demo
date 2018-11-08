
const baseRadius = 20;
const baseAlpha = 200;

const FlameColor = {
	'red': 0,
	'green': 1,
	'blue': 2
};

const primaryDecay = 16;
const secondaryDecay = 8;
const alphaDecay = 12;
const colourPairings = [[2, 1], [0, 2], [0, 1]];

function shiftFlameColour() {
	if (currentFlameColor == FlameColor['red']) {
		currentFlameColor = FlameColor['green'];
	} else if (currentFlameColor == FlameColor['green']) {
		currentFlameColor = FlameColor['blue'];
	} else {
		currentFlameColor = FlameColor['red'];
	}
}

var currentFlameColor = FlameColor['red'];

function rgbaToHex(r,g,b,a) {
	let values = [r, g, b, a];
	let hex = '#';
	for (var i = 0; i < values.length; i++) {
		hex += values[i].toString(16).padStart(2, '0').toUpperCase();
	}
	return hex;
}

var Flame = function(x, y) {
	this.x = x;
	this.y = y;
	this.radius = Math.random() * 10 + baseRadius;
	this.colourRGB = [255, 255, 255]
	this.a = baseAlpha;
	this.decayModifier = Math.round(Math.random() * 10 - 5);
	this.colour = rgbaToHex(this.colourRGB[0], this.colourRGB[1], this.colourRGB[2], this.a);
	this.done = false;

	this.updateFlameColour = function() {
		if (this.colourRGB[colourPairings[currentFlameColor][0]] > 0) {
			this.colourRGB[colourPairings[currentFlameColor][0]] -= (primaryDecay + this.decayModifier);
		} else if (this.colourRGB[colourPairings[currentFlameColor][1]] > 0) {
			this.colourRGB[colourPairings[currentFlameColor][1]] -= (secondaryDecay + this.decayModifier);
		} else {
			this.a -= (alphaDecay + this.decayModifier);
		}

		if (this.colourRGB[0] < 0) {
			this.colourRGB[0] = 0;
		}
		if (this.colourRGB[1] < 0) {
			this.colourRGB[1] = 0;
		}
		if (this.colourRGB[2] < 0) {
			this.colourRGB[2] = 0;
		}
		if (this.a < 0) {
			this.a = 0;
		}
	};

	this.update = function() {
		this.y -= 4;
		this.x += Math.random() * 5 - 2.5;
		this.radius *= 0.98;

		this.updateFlameColour();

		if (this.a == 0) {
			this.done = true;
		}

		this.colour = rgbaToHex(this.colourRGB[0], this.colourRGB[1], this.colourRGB[2], this.a);

	};

	this.draw = function() {
		ctx.beginPath();
		ctx.fillStyle = rgbaToHex(this.colourRGB[0], this.colourRGB[1], this.colourRGB[2], 10);
		ctx.arc(this.x, this.y, this.radius + 20, 0, 2 * Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle = rgbaToHex(this.colourRGB[0], this.colourRGB[1], this.colourRGB[2], 30);
		ctx.arc(this.x, this.y, this.radius + 10, 0, 2 * Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle = this.colour;
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
	};
};