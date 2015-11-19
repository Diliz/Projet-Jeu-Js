function tick(event) {
  if(!pause){
  if (nextBullet <= 0) {
    if (alive && shoot) {
      nextBullet = BULLET_TIME;
      fireBullet();
    }
  } else {
    nextBullet--;
  }

  if (nextEnnemy <= 0) {
    if (alive) {
      var index = getEnnemies(1);
      ennemies[index].floatOnScreen(canvas.width, canvas.height);
      nextEnnemy = 100;
    }
  } else {
    nextEnnemy--;
  }

  for (bullet in bullets) {
    var o = bullets[bullet];
    o.x += BULLET_SPEED;
    if (--o.entropy <= 0) {
      stage.removeChild(o);
      o.active = false;
    }
  }

  for (ennemy in ennemies) {
    var o = ennemies[ennemy];
    o.tick(event);

    if (alive && o.hitRadius(ship.x, ship.y, 10) && o.active) {
      alive = false;
      stage.removeChild(ship);
      messageField.text = "You losed:  Click or hit enter to play again";
      stage.addChild(messageField);
      watchRestart();
      createjs.Sound.play("death", createjs.Sound.INTERRUPT_ANY);
      continue;
    }
  }

  for (bullet in bullets) {
    var p = bullets[bullet];
    if (!p || !p.active) {
      continue;
    }

    if (o.hitRadius(p.x, p.y, 10) && o.active) {
      if (alive) {
        scoreField.text = "Score: " + (Number(scoreField.text.substr(7)) + Number(2)).toString();
      }

      stage.removeChild(o);
      ennemies[ennemy].active = false;

      stage.removeChild(p);
      bullets[bullet].active = false;

      createjs.Sound.play("break", {interrupt: createjs.Sound.INTERUPT_LATE, offset: 0.8});
    }
  }
  ship.tick(event);
}
  stage.update(event);
}
