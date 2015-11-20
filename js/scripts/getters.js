function getBullet() {
  var i = 0;
  var len = bullets.length;
  while (i <= len) {
    if (!bullets[i]) {
      bullets[i] = new createjs.Shape();
      bullets[i].active = true;
      break;
    } else {
      i++;
    }
  }

  if (len == 0) {
    bullets[0] = new createjs.Shape();
  }

  stage.addChild(bullets[i]);
  return i;
}

function getEnnemyBullet() {
  var i = 0;
  var len = bulletsEnnemies.length;
  while (i <= len) {
    if (!bulletsEnnemies[i]) {
      bulletsEnnemies[i] = new createjs.Shape();
      bulletsEnnemies[i].active = true;
      break;
    } else {
      i++;
    }
  }

  if (len == 0) {
    bulletsEnnemies[0] = new createjs.Shape();
  }

  stage.addChild(bulletsEnnemies[i]);
  return i;
}

function getBossBullet() {
  var i = 0;
  var len = bulletsBoss.length;
  while (i <= len) {
    if (!bulletsBoss[i]) {
      bulletsBoss[i] = new createjs.Shape();
      bulletsBoss[i].active = true;
      break;
    } else {
      i++;
    }
  }

  if (len == 0) {
    bulletsBoss[0] = new createjs.Shape();
  }

  stage.addChild(bulletsBoss[i]);
  return i;
}

function getEnnemies(wave) {
  var formation = formationsModels[(mapModels[map - 1].map[wave]) - 1];
  var rand = Math.random() * 450 + 20;
  for (var i = 0; i < formation.lines; i++) {
    for (var j = 0; j < formation.columns; j++) {
      if (formation.formation[i][j] > 0) {
        ennemies[(i * formation.columns) + wave + j] = new Ennemy(formation.formation[i][j]);
        stage.addChild(ennemies[(i * formation.columns) + wave + j]); 
        ennemies[(i * formation.columns) + wave + j].floatOnScreen(canvas.width + (j * 40), rand + (i * 40));
      }
    }
  }
  return;
}

function getBoss() {
  boss[map - 1] = new Boss(mapModels[map - 1].map[wave] - 1);
  stage.addChild(boss[map - 1]);
  boss[map - 1].floatOnScreen(canvas.width, (canvas.height / 2));
  return;
}

function getBonus(bonusId, x, y) {
  var i = 0;
  var len = bonus.length;
  while (i <= len) {
    if (!bonus[i]) {
      bonus[i] = new Bonus(bonusId - 1);
      bonus[i].getShape();
      
      bonus[i].floatOnScreen(x, y);
      break;
    } else {
      i++;
    }
  }

  if (len == 0) {
    bonus[i] = new Bonus(bonusId - 1);
    bonus[i].getShape();
    bonus[i].floatOnScreen(x, y);
  }

  stage.addChild(bonus[i]);
  return i;
}
