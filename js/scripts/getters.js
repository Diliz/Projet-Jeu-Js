
function getBullet() {
  var i = 0;
  var len = bullets.length;
  while (i <= len) {
    if (!bullets[i]) {
      bullets[i] = new createjs.Shape();
      break;
    } else if (!bullets[i].active) {
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

function getEnnemies(size) {
  var i = 0;
  var len = ennemies.length;

  while (i <= len) {
    if (!ennemies[i]) {
      ennemies[i] = new Ennemy(size);
      break;
    } else if (!ennemies[i].active) {
      ennemies[i].activate(size);
      break;
    } else {
      i++;
    }
  }

  if (len == 0) {
    ennemies[0] = new Ennemy(size);
  }
  stage.addChild(ennemies[i]);
  return i;
}
