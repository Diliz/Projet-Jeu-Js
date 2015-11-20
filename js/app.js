function init() {
    pause = 1;
    bossSpawned = false;
    escapeDown = false;
    wave = 0;
    map = 1;
    mapModels = [];
    bonusModels = [];
    formationsModels = [];
    ennemyModels = [];
    bossModels = [];
    boss = [];
    bonus = [];
    nextEnnemyBullet = [];
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
    var jsonTypes = ["formation-", "boss-", "map-","ennemy-", "bonus-", "hero"];
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
             case "bonus":
               bonusModels.push(json);
               break;
           }
        });
      }
    };
    soundSources = [
      {id: "music", src: "sounds/music.ogg"},
      {id: "begin", src: "sounds/spawn.ogg"},
      {id: "death", src: "sounds/death.ogg"},
      {id: "laser", src: "sounds/shot.ogg"},
      {id: "break", src: "sounds/break.ogg"}
    ];

    createjs.Sound.alternateExtensions = ["mp3"];
    preload = new createjs.LoadQueue();
    preload.installPlugin(createjs.Sound);
    preload.loadFile({id:"begin", src:"sounds/spawn.ogg"});
    preload.loadFile({id:"music", src:"sounds/music.ogg"});
    preload.loadFile({id:"death", src:"sounds/death.ogg"});
    preload.loadFile({id:"laser", src:"sounds/shot.ogg"});
    preload.loadFile({id:"break", src:"sounds/break.ogg"});
    // preload.loadManifest(soundSources);
    preload.addEventListener("progress", updateLoading());
    preload.addEventListener("complete", doneLoading());
    stage.update();
}

function restart() {
  stage.removeAllChildren();
  scoreField.text = "Score: 0";
  stage.addChild(scoreField);
  lifeField.text = "Life points: 5";
  stage.addChild(lifeField);

  ennemies = [];
  boss = [];
  bullets = [];
  bulletsEnnemies = [];
  bulletsBoss = [];

  pause = 1;
  wave = 0;
  bossSpawned = false;
  escapeDown = false;
  alive = true;
  ship = new Ship();
  ship.x = canvas.width / 2;
  ship.y = canvas.height / 2;

  nextEnnemyBullet = [];
  nextWave = nextBullet = nextBossBullet = 0;
  shoot = left = right = up = down = false;

  stage.clear();
  stage.addChild(ship);
  createjs.Ticker.setFPS(60);
  if (!createjs.Ticker.hasEventListener("tick")) {
    createjs.Ticker.addEventListener("tick", tick);
  }
}

function changeMap() {
  ennemies = [];
  bullets = [];
  boss = [];
  bulletsEnnemies = [];
  bulletsBoss = [];

  map++;
  wave = 0;
  bossSpawned = false;
  escapeDown = false;

  nextEnnemyBullet = [];

  nextWave = nextBullet = nextBossBullet = 0;
  shoot = left = right = up = down = false;

  stage.removeChild(messageField);
  stage.update();

  stage.addChild(ship);

  createjs.Ticker.setFPS(60);
  if (!createjs.Ticker.hasEventListener("tick")) {
    createjs.Ticker.addEventListener("tick", tick);
  }
}

function theEnd() {
  stage.removeAllChildren();
  stage.update();
  stop();
}