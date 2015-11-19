
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

function getEnnemies(wave) {
  var i = 0;
  var test = formationsModels[(mapModels[map - 1].map[wave][1]) - 1];
  var rand = Math.random() * 500 + 20;
  for (var i = 0; i < test.lines; i++) {
    for (var j = 0; j < test.columns; j++) {
      if (test.formation[i][j] > 0) {
        ennemies[(i * test.columns) + wave + j] = new Ennemy(test.formation[i][j]);
        ennemies[(i * test.columns) + wave + j].getShape();
        stage.addChild(ennemies[(i * test.columns) + wave + j]); 
        ennemies[(i * test.columns) + wave + j].floatOnScreen(canvas.width + (j * 20), rand + (i * 20));
      }
    }
  }
  return;
}

function getBoss(map) {
  console.log("boss");
  return 1;
}
