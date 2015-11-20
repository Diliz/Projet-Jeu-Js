(function (window) {

	function Boss(bossId) {
		this.Shape_constructor();
		this.bossId = bossId;
		this.getShape();
	}

	var p = createjs.extend(Boss, createjs.Shape);

	p.size;
	p.bossId;
	p.spin;
	p.score;
	p.active;
	p.type;
	p.dir;
	p.lives;

	p.getShape = function () {
		this.active = true;
		this.size = bossModels[this.bossId].size;
		this.score = this.size;
		this.lives = bossModels[this.bossId].lives;
		this.graphics.clear();
		this.graphics.beginStroke("#FF0000");
		this.graphics.moveTo(bossModels[this.bossId].shape[0][0], bossModels[this.bossId].shape[0][1]);
		for (var i = 1; i < bossModels[this.bossId].shape.length; i++) {
			this.graphics.lineTo(bossModels[this.bossId].shape[i][0], bossModels[this.bossId].shape[i][1]);
		}
		this.graphics.closePath();
		this.dir = ennemyModels[this.bossId].speed;
	}

	p.tick = function (event) {
		if (this.x > 580) {
			this.x -= 1;
		} else{
			if (this.y < 100 || this.y > 500) {
				this.dir *= -1;
			}
			this.rotation += this.dir;
			this.y += this.dir;
		}
	}

	p.floatOnScreen = function (width, height) {
		this.x = width;
		this.y = height;
	}

	p.hitRadius = function (tX, tY, tHit) {
		if (tX - tHit > this.x + this.size) {
			return;
		}
		if (tX + tHit < this.x - this.size) {
			return;
		}
		if (tY - tHit > this.y + this.size) {
			return;
		}
		if (tY + tHit < this.y - this.size) {
			return;
		}
		return this.size + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
	}

	window.Boss = createjs.promote(Boss, "Shape");
}(window));
