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
  	p.lives = 5;

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

	window.Ship = createjs.promote(Ship, "Container");
}(window));
