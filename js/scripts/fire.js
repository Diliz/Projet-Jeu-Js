function fireBullet() {
  var o = bullets[getBullet()];
  o.x = ship.x;
  o.y = ship.y;
  o.active = true;

  o.graphics.beginStroke("#FF0000").moveTo(-6, 2).lineTo(6, 2).lineTo(6, 0).lineTo(-6, 0).closePath();
  createjs.Sound.play("laser", createjs.Sound.INTERUPT_LATE);
}

function fireEnnemyBullet(ennemyShip) {
  var o = bulletsEnnemies[getEnnemyBullet()];
  o.x = ennemyShip.x - ennemyShip.size;
  o.y = ennemyShip.y + ennemyShip.size;
  o.active = true;

  o.graphics.beginStroke("#00FF00").moveTo(-6, 2).lineTo(6, 2).lineTo(6, 0).lineTo(-6, 0).closePath();
  createjs.Sound.play("laser", createjs.Sound.INTERUPT_LATE);
}

function fireBonus(ennemyShip) {
  var o = bonus[getBonus()];
  o.x = ennemyShip.x - ennemyShip.size;
  o.y = ennemyShip.y + ennemyShip.size;
  o.active = true;

  o.graphics.beginStroke("#0000FF").moveTo(-6, 2).lineTo(6, 2).lineTo(6, 0).lineTo(-6, 0).closePath();
  createjs.Sound.play("laser", createjs.Sound.INTERUPT_LATE);
}

function fireBossBullet(number) {
  for (var i = 0; i < number; i++) {
    var o = bulletsBoss[getBossBullet()];
    o.x = boss[map - 1].x - boss[map - 1].size;
    o.y = boss[map - 1].y + boss[map - 1].size + i * 35;
    o.active = true;
    // o.radius = Math.atan((ship.y - boss[map - 1].y) / (ship.x - boss[map - 1].x));
    o.graphics.beginStroke("#00FF00").moveTo(-6, 2).lineTo(6, 2).lineTo(6, 0).lineTo(-6, 0).closePath();
  };

  createjs.Sound.play("laser", createjs.Sound.INTERUPT_LATE);
 
}
