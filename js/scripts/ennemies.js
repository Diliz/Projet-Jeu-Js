(function (window) {

	function Ennemy(ennemyId) {
		this.Shape_constructor();
		this.ennemyId = ennemyId - 1;
		this.getShape();
	}

	var p = createjs.extend(Ennemy, createjs.Shape);

	p.size;
	p.ennemyId;
	p.spin;
	p.score;
	p.active;
	p.type;
	p.dir;
	p.lives;

	p.getShape = function () {
		this.active = true;
		this.graphics.clear();
		this.graphics.beginStroke("#FFFFFF");

		this.size = ennemyModels[this.ennemyId].size;
		this.score = this.size;
		this.lives = ennemyModels[this.ennemyId].lives;
		this.graphics.moveTo(ennemyModels[this.ennemyId].shape[0][0], ennemyModels[this.ennemyId].shape[0][1]);
		for (var i = 1; i < ennemyModels[this.ennemyId].shape.length; i++) {
			this.graphics.lineTo(ennemyModels[this.ennemyId].shape[i][0], ennemyModels[this.ennemyId].shape[i][1]);
		}
		this.graphics.closePath();
		this.dir = ennemyModels[this.ennemyId].speed;
	}

	p.tick = function (event) {
		this.x -= this.dir;
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

	window.Ennemy = createjs.promote(Ennemy, "Shape");
}(window));
