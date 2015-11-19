function handleKeyDown(e) {
  if (!e) {
    var e = window.event;
  }
  switch (e.keyCode) {
    case KEYCODE_SPACE:
    // case GAMEPAD_A:
      shoot = true;
      return false;
    case KEYCODE_Q:
    case KEYCODE_LEFT:
      left = true;
      return false;
    case KEYCODE_S:
    case KEYCODE_DOWN:
      down = true;
      return false;
    case KEYCODE_D:
    case KEYCODE_RIGHT:
      right = true;
      return false;
    case KEYCODE_Z:
    case KEYCODE_UP:
      up = true;
      return false;
    case KEYCODE_ENTER:
      if (canvas.onclick == handleClick) {
        handleClick();
      }
      return false;
  }
}

function handleKeyUp(e) {
  if (!e) {
    var e = window.event;
  }
  switch (e.keyCode) {
    case KEYCODE_SPACE:
      shoot = false;
      break;
    case KEYCODE_Q:
    case KEYCODE_LEFT:
      left = false;
      break;
    case KEYCODE_S:
    case KEYCODE_DOWN:
      down = false;
      return false;
    case KEYCODE_D:
    case KEYCODE_RIGHT:
      right = false;
      break;
    case KEYCODE_Z:
    case KEYCODE_UP:
      up = false;
      break;
  }
}

function handleClick() {
  canvas.onclick = null;
  stage.removeChild(messageField);
  createjs.Sound.play("begin");
  restart();
}
