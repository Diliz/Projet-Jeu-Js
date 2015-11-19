	var BULLET_TIME = 5;
	var BULLET_ENTROPY = 50;
	var BULLET_SPEED = 17;

	var KEYCODE_ENTER = 13;
	var KEYCODE_SPACE = 32;
	var KEYCODE_UP = 38;
	var KEYCODE_LEFT = 37;
	var KEYCODE_RIGHT = 39;
	var KEYCODE_DOWN = 40;
	var KEYCODE_Z = 90;
	var KEYCODE_Q = 81;
	var KEYCODE_D = 68;
	var KEYCODE_S = 83;

	var manifest;
	var preload;
	var pause;

	var shoot;
	var left;
	var right;
	var up;
	var down;

	var bullets;
	var nextBullet;

	var ennemies;
	var nextEnnemy;

	var canvas;
	var stage;

	var ship;
	var alive;

	var messageField;
	var scoreField;

	var loadingInterval = 0;

	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
