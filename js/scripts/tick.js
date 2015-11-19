function tick(event) {
  if (pause > 0) {
    if (wave >= (mapModels[map - 1].map.length - 1) && bossSpawned == false) {
      bossSpawned = true;
      var index = getBoss(map);
      ennemies[index].floatOnScreen(canvas.width, canvas.height);
    }

    if (nextBullet <= 0 && (!boss || (boss.y && boss.y != 580))) {
      if (alive && shoot) {
        nextBullet = BULLET_TIME;
        fireBullet();
      }
    } else {
      nextBullet--;
    }

    if (bossSpawned == false) {
      if (nextWave <= 0) {
        if (alive) {
          getEnnemies(wave);
          nextWave = 250;
          wave++;
        }
      } else {
        nextWave--;
      }
    }


    for (bullet in bullets) {
      var o = bullets[bullet];
      o.x += BULLET_SPEED;
      if (o.x >= 1000) {
        o.active = false;
        stage.removeChild(o);
      }
    }

    for (ennemy in ennemies) {
      var o = ennemies[ennemy];
      o.tick(event);

      if (alive && o.hitRadius(ship.x, ship.y, 10) && o.active) {
        alive = false;
        stage.removeChild(ship);
        messageField.text = "You lose:  Click or hit enter to play again";
        stage.addChild(messageField);
        watchRestart();
        createjs.Sound.play("death", createjs.Sound.INTERRUPT_ANY);
        continue;
      }

      for (bullet in bullets) {
        var p = bullets[bullet];
        
        if (o.hitRadius(p.x, p.y, 4) && o.active && p.active) {
          if (alive) {
            scoreField.text = "Score: " + (Number(scoreField.text.substr(7)) + Number(2)).toString();
          }

          ennemies[ennemy].active = false;
          stage.removeChild(o);

          bullets[bullet].active = false;
          stage.removeChild(p);

          createjs.Sound.play("break", {interrupt: createjs.Sound.INTERUPT_LATE, offset: 0.8});
        }
      }
    }
    ship.tick(event);
  }
  stage.update(event);
}
