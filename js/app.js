function init() {
    pause = 1;
    bossSpawned = false;
    escapeDown = false;
    wave = 0;
    map = 1;
    mapModels = [];
    formationsModels = [];
    ennemyModels = [];
    bossModels = [];
    hero = [];
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
    var jsonTest;
    var jsonTypes = ["formation-", "boss-", "map-","ennemy-", "hero"];
    var j = 0;
    for (i = 1; i <= 3; i++) {
      if (i == 3) {
        i = 1;
        j++;
      }

      if (jsonTypes[j].toString() == "hero") {
        $.getJSON('js/models/' + jsonTypes[j].toString() + '.json', function(json){hero = json;});
        break;
      } else {
        $.getJSON('js/models/' + jsonTypes[j].toString() + i.toString() +'.json', function(json){
          switch(json.type){
             case "ennemy":
               ennemyModels.push(json);
               break;
             case "boss":
               bossModels.push(json);
               break;
             case "formation":
               formationsModels.push(json);
               break;
             case "map":
               mapModels.push(json);
               break;
           }
        });
      }
    };
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

  pause = 1;
  wave = 0;
  bossSpawned = false;
  escapeDown = false;
  alive = true;
  ship = new Ship();
  ship.x = canvas.width / 2;
  ship.y = canvas.height / 2;

  nextWave = nextBullet = 0;

  shoot = left = right = up = down = false;

  stage.clear();
  stage.addChild(ship);
  createjs.Ticker.setFPS(60);
  if (!createjs.Ticker.hasEventListener("tick")) {
    createjs.Ticker.addEventListener("tick", tick);
  }
}

function changeMap() {
  stage.removeAllChildren();
  ennemies = [];
  bullets = [];

  map++;
  wave = 0;
  pause = 1;
  bossSpawned = false;
  escapeDown = false;

  nextWave = nextBullet = 0;

  stage.clear();
  stage.addChild(ship);

  createjs.Ticker.setFPS(60);
  if (!createjs.Ticker.hasEventListener("tick")) {
    createjs.Ticker.addEventListener("tick", tick);
  }
}