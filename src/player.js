function Player(gs, posX, posY) {
    var pos = [
	posX, posY
    ];

    var Keycodes = {
	UP: 38,
	RIGHT: 39,
	LEFT: 37
    };

    var jumpHeight = 48;
    var velocity = 0;

    var p = new Sprite(["center", "bottom"],
		       {
			   stand: [["img/player.png", 0]]
		       },
		       function() {
			   p.action("stand");
		       }
		      );

    var updateAnimation = function() {
	p.action("stand");
    };

    var update = function() {
	updateAnimation();
	if (velocity != 0) {
	    if ( pos[1] > (posY - jumpHeight) ||
		 pos[1] < posY) {
		pos[1] -= velocity;
	    }

	    velocity -= 9.8 * 30/1000;
	}
    };

    var draw = function(c) {
	p.draw(c, pos);
    };

    var get_collision_aabb = function() {
	return p.aabb(pos);
    };

    var collide_aabb = function(who) {
	if ( who.hasOwnProperty('type') &&
	     who.type === "floor" ) {
		 if (velocity < 0) {
		     velocity = 0;
		     pos[1] = posY;
		 }
	     }

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
	if ( velocity === 0 ) {
	    velocity = 6;
	}
    };

    var keyDown_37 = function() {
	console.log("Left pressed");
    };

    var keyDown_39 = function() {
	console.log("Right pressed");
    };

    return {
	update: update,
	draw: draw,
	priority: 3,

	// collision
	get_collision_aabb: get_collision_aabb,
	collide_aabb: collide_aabb,

	// input
	keyDown_37: keyDown_37,
	keyDown_38: keyDown_38,
	keyDown_39: keyDown_39,

	// location
	pos: pos,
	type: "player"
    };
}