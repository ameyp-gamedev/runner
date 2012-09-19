var Hurdle = function(pos) {
    var p = new Sprite(["center", "center"],
		       {
			   stand: [["img/hurdle.png", 0]]
		       },
		       function() {
			   p.action("stand");
		       }
		      );

    var draw = function(c) {
	c.fillRect(origin.x, origin.y, bounds.x, bounds.y);
    };

    var get_collision_aabb = function() {
	return [origin.x, origin.y, bounds.x, bounds.y];
    };

    return {
	draw: draw,
	get_collision_aabb: get_collision_aabb,
	opague: true
    };
};
