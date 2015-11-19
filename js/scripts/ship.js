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
		graphics.moveTo(0, 10).lineTo(10, -12).lineTo(0, -4).lineTo(-10, -12).closePath();
		this.shipBody.rotation -= 90;
		this.hit = 2;
	}

	p.tick = function (event) {
    if (down == true && this.y < 580) {
      this.y += 10;
    }
    if (up == true && this.y > 20) {
      this.y -= 10;
    }
    if (left == true && this.x > 20) {
      this.x -= 10;
    }
    if (right == true && this.x < 400) {
      this.x += 10;
    }
	}

	window.Ship = createjs.promote(Ship, "Container");
}(window));
