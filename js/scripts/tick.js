function tick(event) {
  if (pause > 0) {
    if (wave == mapModels[map - 1].map.length - 1 && bossSpawned == false && nextWave <= 0) {
      bossSpawned = true;
      getBoss();
    } else if(wave >= mapModels[map - 1].map.length - 1 && bossSpawned == false){
      nextWave--; 
    }

    if (nextBullet <= 0 && (!boss[map - 1] || boss[map - 1].x <= 580)) {
      if (alive && shoot) {
        nextBullet = BULLET_TIME;
        fireBullet();
      }
    } else {
      nextBullet--;
    }

    if (wave < mapModels[map - 1].map.length - 1) {
      if (nextWave <= 0) {
        if (alive) {
          getEnnemies(wave);
          if (wave < mapModels[map - 1].map.length - 2) {
            nextWave = 250;
          } else{
            nextWave = 400;
          }
          wave++;
        }
      } else {
        nextWave--;
      }
    }

     for (bonusShapes in bonus) {
      var k = bonus[bonusShapes];
      k.tick();
      if (ship.hitRadius(k.x, k.y, (ship.size * 2)) && k.active) {
        if (k.lives == true && ship.lives < 5 && alive) {
          ship.lives++;
          lifeField.text = "Life points: " + Number(ship.lives);
          k.active = false;
          stage.removeChild(k);
        }
        if (k.weapon == true && alive) {
          if (BULLET_TIME > 1) {
            BULLET_TIME /= 2;
          }
          k.active = false;
          stage.removeChild(k);
        }
      }
      if (k.x < -100) {
        k.active = false;
        stage.removeChild(k);
      }
    }

    for (bullet in bullets) {
      var b = bullets[bullet];
      b.x += BULLET_SPEED;
      if (b.x >= 1000) {
        b.active = false;
        stage.removeChild(b);
      }
    }

    for (bullet in bulletsEnnemies) {
      var be = bulletsEnnemies[bullet];
      be.x -= BULLET_ENNEMY_SPEED;
      if (be.x < -50) {
        be.active = false;
        stage.removeChild(be);
      }
    }

    for (bullet in bulletsBoss) {
      var bb = bulletsBoss[bullet];
      // bb.x = bb.x * bb.radius;
      // bb.y = bb.y * bb.radius;
      bb.x -= BULLET_BOSS_SPEED;
      if (bb.x < -50 || bb.y < -50 || bb.y > 1000) {
        bb.active = false;
        stage.removeChild(bb);
      }
    }

    for (ennemy in ennemies) {
      var o = ennemies[ennemy];
      o.tick(event);

      if ((isNaN(nextEnnemyBullet[ennemy]) || nextEnnemyBullet[ennemy] <= 0) && o.active) {
        if (alive) {
          nextEnnemyBullet[ennemy] = BULLET_ENNEMY_TIME;
          fireEnnemyBullet(o);
        }
      } else {
        nextEnnemyBullet[ennemy] -= 1;
      }

      for (bullet in bullets) {
        var p = bullets[bullet];
        
        if (o.hitRadius(p.x, p.y, (o.size * 2)) && o.active && p.active) {
          if (alive) {
            scoreField.text = "Score: " + (Number(scoreField.text.substr(7)) + o.score).toString();
          }
          if (Math.random() < 0.5) {
            if (Math.random() < 0.5) {
              getBonus(2, o.x, o.y);
            } else{
              getBonus(1, o.x, o.y);
            }
          }
          ennemies[ennemy].active = false;
          stage.removeChild(ennemies[ennemy]);

          bullets[bullet].active = false;
          stage.removeChild(bullets[bullet]);

          createjs.Sound.play("break", {interrupt: createjs.Sound.INTERUPT_LATE, offset: 0.8});
        }
      }
      for (bullet in bulletsEnnemies) {
        var p = bulletsEnnemies[bullet];
        
        if (ship.hitRadius(p.x, p.y, 2) && alive && p.active) {
          if (ship.lives <= 0) {
            alive = false;
            stage.removeChild(ship);
            messageField.text = "You're dead:  Click to play again";
            stage.addChild(messageField);
            watchRestart();
            createjs.Sound.play("death", createjs.Sound.INTERRUPT_ANY);
          } else{
            ship.lives--;
            BULLET_TIME = 8;
            lifeField.text = "Life points: " + Number(ship.lives);
          }
          bulletsEnnemies[bullet].active = false;
          stage.removeChild(p);
          createjs.Sound.play("break", {interrupt: createjs.Sound.INTERUPT_LATE, offset: 0.8});
        }
      }
      if (ship.hitRadius(o.x, o.y, ship.size / 2) && alive && o.active) {
        if (ship.lives <= 0) {
          alive = false;
          stage.removeChild(ship);
          messageField.text = "You're dead:  Click to play again";
          stage.addChild(messageField);
          watchRestart();
          createjs.Sound.play("death", createjs.Sound.INTERRUPT_ANY);
          bulletsEnnemies[bullet].active = false;
          stage.removeChild(p);
        } else {
          ship.lives--;
          BULLET_TIME = 8;
          lifeField.text = "Life points: " + Number(ship.lives);
        }
        ennemies[ennemy].active = false;
        stage.removeChild(ennemies[ennemy]);
        createjs.Sound.play("break", {interrupt: createjs.Sound.INTERUPT_LATE, offset: 0.8});
      }
    }

    if(wave == mapModels[map - 1].map.length - 1 && bossSpawned == true) {
      boss[map - 1].tick(event);

      if ((isNaN(nextBossBullet) || nextBossBullet <= 0) && boss[map - 1].active && boss[map - 1].x <= 580) {
        if (alive) {
          nextBossBullet = BULLET_BOSS_TIME;
          fireBossBullet(Math.random() * 5 + 2);
        }
      } else {
        nextBossBullet -= 1;
      }

      for (bullet in bullets) {
        var p = bullets[bullet];
        
        if (boss[map - 1].hitRadius(p.x, p.y, boss[map - 1].size) && boss[map - 1].active && p.active) {
          if (alive) {
            scoreField.text = "Score: " + (Number(scoreField.text.substr(7)) + Number(2)).toString();
          }

          bullets[bullet].active = false;
          stage.removeChild(p);

          if (boss[map - 1].lives <= 0) {
            boss[map - 1].active = false;
            stage.removeChild(boss[map - 1]);
            if (mapModels.length == map) {
              messageField.text = "Game complete:  Click or hit enter to stop the game!";
              watchEnd();
            } else{
              messageField.text = "Stage " + map + " complete:  Click or hit enter to play the next level!";
              watchChange();
            }
          } else{
            boss[map - 1].lives--;
          }
          createjs.Sound.play("break", {interrupt: createjs.Sound.INTERUPT_LATE, offset: 0.8});
        }
      }
      for (bullet in bulletsBoss) {
        var p = bulletsBoss[bullet];
        
        if (ship.hitRadius(p.x, p.y, 2) && alive && p.active) {
          if (ship.lives <= 0) {
            alive = false;
            stage.removeChild(ship);
            messageField.text = "You're dead:  Click to play again";
            stage.addChild(messageField);
            watchRestart();
            createjs.Sound.play("death", createjs.Sound.INTERRUPT_ANY);
          } else{
            ship.lives--;
            BULLET_TIME = 8;
            lifeField.text = "Life points: " + Number(ship.lives);
          }
          bulletsBoss[bullet].active = false;
          stage.removeChild(p);
          createjs.Sound.play("break", {interrupt: createjs.Sound.INTERUPT_LATE, offset: 0.8});
        }
      }
    }
    ship.tick(event);
  }
  stage.update(event);
}
