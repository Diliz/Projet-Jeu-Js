var stage;

function init() {
    pause = false;
    canvas = document.getElementById("shooter");
    stage = new createjs.Stage(canvas);
    messageField = new createjs.Text("Loading", "bold 24px Arial", "#FFFFFF");
    messageField.maxWidth = 1000;
    messageField.textAlign = "center";
    messageField.textBaseline = "middle";
    messageField.x = canvas.width / 2;
    messageField.y = canvas.height / 2;
    stage.addChild(messageField);
    stage.update();
    $.getJSON( "js/models/formation-1.json?callback=jsoncallback", function( json ) {
        console.log( "JSON Data: " + JSON.stringify(json) );
    });
    var assetsPath = "sounds/";
    soundSources = [
      {id: "begin", src: "spawn.ogg"},
      {id: "break", src: "break.ogg", data: 6},
      {id: "death", src: "death.ogg"},
      {id: "laser", src: "shot.ogg", data: 6},
      {id: "music", src: "music.ogg"}
    ];

    createjs.Sound.alternateExtensions = ["mp3"];
    preload = new createjs.LoadQueue(true, assetsPath);
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("progress", updateLoading());
    preload.addEventListener("complete", doneLoading());
    preload.loadManifest(manifest);
    stage.update();
}

function stop() {
  if (preload != null) {
    preload.close();
  }
  createjs.Sound.stop();
}

function restart() {
  stage.removeAllChildren();
  scoreField.text = "Score: 0";
  stage.addChild(scoreField);

  ennemies = [];
  bullets = [];

  alive = true;
  ship = new Ship();
  ship.x = canvas.width / 2;
  ship.y = canvas.height / 2;

  nextEnnemy = nextBullet = 0;

  shoot = left = right = up = down = false;

  stage.clear();
  stage.addChild(ship);

  if (!createjs.Ticker.hasEventListener("tick")) {
    createjs.Ticker.addEventListener("tick", tick);
  }
}
