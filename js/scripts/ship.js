(function (window) {
	function Ship() {
		this.Container_constructor();

		this.shipBody = new createjs.Shape();

		this.addChild(this.shipBody);

		this.makeShape();
	}

	var p = createjs.extend(Ship, createjs.Container);

	p.shipBody;
	p.hit;
	p.size;
  	p.lives;

	p.makeShape = function () {
		var graphics = this.shipBody.graphics;
		graphics.clear();
		graphics.beginStroke("#FFFFFF");

		graphics.moveTo(hero.shape[0][0], hero.shape[0][1]);
		graphics.lineTo(hero.shape[1][0], hero.shape[1][1]);
		graphics.lineTo(hero.shape[2][0], hero.shape[2][1]);
		graphics.lineTo(hero.shape[3][0], hero.shape[3][1]);
		graphics.closePath();

		this.shipBody.rotation -= 90;
		this.hit = 2;
		this.size = hero.size;
		this.lives = hero.lives;
	}

	p.tick = function (event) {
	    if (down == true && this.y < 580) {
	      this.y += 5;
	    }
	    if (up == true && this.y > 20) {
	      this.y -= 5;
	    }
	    if (left == true && this.x > 20) {
	      this.x -= 5;
	    }
	    if (right == true && this.x < 400) {
	      this.x += 5;
	    }
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

	window.Ship = createjs.promote(Ship, "Container");
}(window));
