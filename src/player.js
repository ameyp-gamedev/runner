var PlayerGlobals = {
    Keycodes: {
	UP: 38,
	DOWN: 40,
	RIGHT: 39,
	LEFT: 37,
	W: 188,
	S: 79,
	A: 65,
	D: 69
    },
    Constants: {
	sqrt2: 1.414
    }
};

function Player(gs) {
    var WALK_VX = 10;
    var WALK_VY = 10;

    var pos = [
	gs.width * 0.5,
	gs.height * 0.5
    ];
    var vx = 0,
	vy = 0;

    var moveUp = false,
	moveDown = false,
	moveLeft = false,
	moveRight = false;

    var r = 25;

    var p = new Sprite(["center", "center"],
		       {
			   stand: [["img/player.png", 0]]
		       },
		       function() {
			   p.action("stand");
		       }
		      );

    var updateAnimation = function() {
	/*
	if (attackTop) {
	    p.action("attack_top", false, function(action) {
		attackTop = false;
	    });
	}
	else if (attackBottom) {
	    p.action("attack_bottom", false, function(action) {
		attackBottom = false;
	    });
	}
	else if (attackLeft) {
	    p.action("attack_left", false, function(action) {
		attackLeft = false;
	    });
	}
	else if (attackRight) {
	    p.action("attack_right", false, function(action) {
		attackRight = false;
	    });
	}
	else {
	 */
	p.action("stand");
	/*
	}
	 */
    };
    var update = function() {
	updateAnimation();
	if (vx !== 0 && vy === 0) {
	    pos[0] += vx;
	}
	else if (vx === 0 && vy !== 0) {
	    pos[1] += vy;
	}
	else {
	    pos[0] += vx/PlayerGlobals.Constants.sqrt2;
	    pos[1] += vy/PlayerGlobals.Constants.sqrt2;
	}
	p.update();
	// console.log("Player position = [" + pos[0] + "," + pos[1] + "]");
    };

    var draw = function(c) {
	// console.log("Drawing at [" + pos[0] + "," + pos[1] + "]");
	p.draw(c, pos);
	//c.fillRect(pos[0] - r/2, pos[1] - r/2, r, r);
    };

    var setPos = function(x, y) {
	pos[0] = x;
	pos[1] = y;
    };

    var get_collision_aabb = function() {
	return [pos[0] - r/2, pos[1] - r/2, r, r];
    };

    var collide_aabb = function(who) {
	if (who.hasOwnProperty('opague') &&
	    who.opague) {
	    var ab = get_collision_aabb();
	    var bb = who.get_collision_aabb();

	    var compare = function(x, y) {
		return x[0] < y[0] ? 1
		    : x[0] > y[0] ? -1 : 0;
	    };

	    var sides = [
		[bb[1] - (ab[1] + ab[3]), 1, 1],
 		[bb[0] - (ab[0] + ab[2]), 0, 1],
 		[ab[0] - (bb[0] + bb[2]), 0, 0],
 		[ab[1] - (bb[1] + bb[3]), 1, 0]
 	    ];
	    sides.sort(compare);
	    var d = sides[0];

	    if (d[1]) {
		if (pos[1] > bb[1] + bb[3]) {
		    pos[1] += WALK_VY;
		}
		else if (pos[1] < bb[1]) {
		    pos[1] -= WALK_VY;
		}
		else {
		    if (d[2]) {
			pos[1] -= WALK_VY;
		    }
		    else {
			pos[1] += WALK_VY;
		    }
		}
		vy = 0;
	    }
	    else {
		if (pos[0] > bb[0] + bb[2]) {
		    pos[0] += WALK_VX;
		}
		else if (pos[0] < bb[0]) {
		    pos[0] -= WALK_VX;
		}
		else {
		    if (d[2]) {
			pos[0] -= WALK_VX;
		    }
		    else {
			pos[0] += WALK_VX;
		    }
		}
		vx = 0;
	    }
	}
    };

    // Up pressed
    var keyDown_38 = function() {
	moveUp = true;
	if (moveDown === false) {
	    vy = -WALK_VY;
	}
	else {
	    vy = 0;
	}
    };
    // Down pressed
    var keyDown_40 = function() {
	moveDown = true;
	if (moveUp === false) {
	    vy = WALK_VY;
	}
	else {
	    vy = 0;
	}
    };
    // Left pressed
    var keyDown_37 = function() {
	moveLeft = true;
	if (moveRight === false) {
	    vx = -WALK_VX;
	}
	else {
	    vx = 0;
	}
    };
    // Right pressed
    var keyDown_39 = function() {
	moveRight = true;
	if (moveLeft === false) {
	    vx = WALK_VX;
	}
	else {
	    vx = 0;
	}
    };
    // Up released
    var keyUp_38 = function() {
	moveUp = false;
	if (moveDown === false) {
	    vy = 0;
	}
	else {
	    vy = WALK_VY;
	}
    };
    // Down released
    var keyUp_40 = function() {
	moveDown = false;
	if (moveUp === false) {
	    vy = 0;
	}
	else {
	    vy = -WALK_VY;
	}
    };
    // Left released
    var keyUp_37 = function() {
	moveLeft = false;
	if (moveRight === false) {
	    vx = 0;
	}
	else {
	    vx = WALK_VX;
	}
    };
    // Right released
    var keyUp_39 = function() {
	moveRight = false;
	if (moveLeft === false) {
	    vx = 0;
	}
	else {
	    vx = -WALK_VX;
	}
    };

    // W pressed
    var keyDown_188 = function() {
	//attackTop = !attackBottom && !attackLeft && !attackRight;
    };
    // S pressed
    var keyDown_79 = function() {
	//attackBottom = !attackTop && !attackLeft && !attackRight;
    };
    // A pressed
    var keyDown_65 = function() {
	//attackLeft = !attackTop && !attackBottom && !attackRight;
    };
    // D pressed
    var keyDown_69 = function() {
	//attackRight = !attackTop && !attackLeft && !attackBottom;
    };

    return {
	update: update,
	draw: draw,
	priority: 1,

	// input handlers
	keyDown_37: keyDown_37,
	keyUp_37: keyUp_37,
	keyDown_38: keyDown_38,
	keyUp_38: keyUp_38,
	keyDown_39: keyDown_39,
	keyUp_39: keyUp_39,
	keyDown_40: keyDown_40,
	keyUp_40: keyUp_40,

	keyDown_188: keyDown_188,
	keyDown_79: keyDown_79,
	keyDown_65: keyDown_65,
	keyDown_69: keyDown_69,

	// collision
	get_collision_aabb: get_collision_aabb,
	collide_aabb: collide_aabb,
	is_player: true,

	// location
	pos: pos,
	setPos: setPos,
	WALK_VX: WALK_VX,
	WALK_VY: WALK_VY
    };
}