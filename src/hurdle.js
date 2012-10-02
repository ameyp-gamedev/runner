var Hurdle = function(pos) {
    var fallen = false;

    var p = Sprite(["center", "bottom"],
		       {
			   stand: [["img/hurdle-vert.png", 0]],
			   fall: [["img/hurdle-hori.png", 0]]
		       },
		       function() {
			   p.activate("stand");
		       }
		      );

    var update = function() {
	pos[0] -= 10;
    };

    var draw = function(c) {
	p.draw(c, pos);
    };

    var get_collision_aabb = function() {
	return p.aabb(pos);
    };

    var collide_aabb = function(who) {
	if ( who.hasOwnProperty("type") &&
	     who.type === "player" &&
	     fallen === false) {
	    p.activate("fall");
	    pos[0] += 8;
	    fallen = true;
	}
    };

    return {
	type: "hurdle",
	pos: pos,

	draw: draw,
	update: update,
	priority: 3,

	get_collision_aabb: get_collision_aabb,
	collide_aabb: collide_aabb
    };
};
