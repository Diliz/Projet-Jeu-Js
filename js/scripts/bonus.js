(function (window) {

	function Bonus(bonusId) {
		this.Shape_constructor();
		this.bonusId = bonusId;
		this.getShape();
	}

	var p = createjs.extend(Bonus, createjs.Shape);

	p.size;
	p.bonusId;
	p.active;
	p.weapon;
	p.lives;
	p.dir;

	p.getShape = function () {
		this.active = true;
		this.lives = bonusModels[this.bonusId].lives;
		this.weapon = bonusModels[this.bonusId].weapon;
		this.graphics.clear();
		this.graphics.beginStroke("#0000FF");
		this.graphics.moveTo(bonusModels[this.bonusId].shape[0][0], bonusModels[this.bonusId].shape[0][1]);
		for (var i = 1; i < bonusModels[this.bonusId].shape.length; i++) {
			this.graphics.lineTo(bonusModels[this.bonusId].shape[i][0], bonusModels[this.bonusId].shape[i][1]);
		}
		this.graphics.closePath();
		this.rotation += 90;
		this.dir = bonusModels[this.bonusId].speed;
	}

	p.tick = function (event) {
		this.x -= this.dir;
	}

	p.floatOnScreen = function (width, height) {
		this.x = width;
		this.y = height;
	}

	window.Bonus = createjs.promote(Bonus, "Shape");
}(window));
