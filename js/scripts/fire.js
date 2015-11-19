function fireBullet() {
  var o = bullets[getBullet()];
  o.x = ship.x;
  o.y = ship.y;
  o.active = true;

  o.graphics.beginStroke("#FF0000").moveTo(-6, 2).lineTo(6, 2).lineTo(6, 0).lineTo(-6, 0).closePath();
  createjs.Sound.play("laser", createjs.Sound.INTERUPT_LATE);
}
