(function (window) {

	function Ennemy(size) {
		this.Shape_constructor(); // super call

		this.activate(size);
	}

	var p = createjs.extend(Ennemy, createjs.Shape);

	p.hit;
	p.size;
	p.spin;
	p.score;
	p.active;

	p.getShape = function (size) {
		this.size = size;
		this.hit = size;

		this.graphics.clear();
		this.graphics.beginStroke("#FFFFFF");
		this.graphics.moveTo(0, 20 * size).lineTo(20 * size, 20 * size).lineTo(20 * size, 0).lineTo(0, 0).closePath();
	}

	p.activate = function (size) {
		this.getShape(size);
		this.score = (5 - size / 10) * 100;
		this.active = true;
	}

	p.tick = function (event) {
		this.x -= 5;
	}

	p.floatOnScreen = function (width, height) {
				this.x = width;
    		this.y = Math.random() * 620 + 20;
	}

	p.hitRadius = function (tX, tY, tHit) {
		if (tX - tHit > this.x + this.hit) {
			return;
		}
		if (tX + tHit < this.x - this.hit) {
			return;
		}
		if (tY - tHit > this.y + this.hit) {
			return;
		}
		if (tY + tHit < this.y - this.hit) {
			return;
		}
		return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
	}

	window.Ennemy = createjs.promote(Ennemy, "Shape");
}(window));
