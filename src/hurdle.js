var Hurdle = function(pos) {
    var p = new Sprite(["center", "bottom"],
		       {
			   stand: [["img/hurdle.png", 0]]
		       },
		       function() {
			   p.action("stand");
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

    return {
	type: "hurdle",
	pos: pos,
	draw: draw,
	update: update,
	priority: 3,
	get_collision_aabb: get_collision_aabb
    };
};
