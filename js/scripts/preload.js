
function updateLoading() {
  messageField.text = "Loading " + (preload.progress * 100 | 0) + "%";
  stage.update();
}

function doneLoading(event) {
  clearInterval(loadingInterval);
  scoreField = new createjs.Text("Score: 0", "bold 20px Arial", "#FFFFFF");
  scoreField.textAlign = "right";
  scoreField.x = canvas.width - 20;
  scoreField.y = 20;
  scoreField.maxWidth = 1000;

  messageField.text = "Welcome: Click to play";
  createjs.Sound.play("music", {interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1, volume: 0.4});

  watchRestart();
}

function watchRestart() {
  stage.addChild(messageField);
  stage.update();
  canvas.onclick = handleClick;
}
