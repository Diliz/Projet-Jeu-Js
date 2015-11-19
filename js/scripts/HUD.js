function createHud() {
    var Hud = new createjs.Container(0, 0);

    var header = new createjs.Text('SPACE SHOOTER: ', '16px Arial', '#CCC');
    header.x = width/2 - header.getMeasuredWidth()/2;
    header.y = 8;
    Hud.addChild(header);

    var scoreLabel = new createjs.Text('SCORE: ', '16px Arial', '#CCC');
    scoreLabel.x = width - scoreLabel.getMeasuredWidth() - 20;
    scoreLabel.y = 8;
    Hud.addChild(scoreLabel);

    var healthLabel = new createjs.Text('HEALTH: ', '16px Arial', '#CCC');
    healthLabel.x = 20;
    healthLabel.y = 8;
    Hud.addChild(healthLabel);

    texts.score = new createjs.Text(values.score, '16px Arial', '#CCC');
    texts.score.textAlign = 'right';
    texts.score.x = width - texts.score.getMeasuredWidth() - 12;
    texts.score.y = 24;
    Hud.addChild(texts.score);

    texts.health = new createjs.Text(values.health, '16px Arial', '#CCC');
    texts.health.x = 20;
    texts.health.y = 24;
    Hud.addChild(texts.health);

    return Hud;
}
