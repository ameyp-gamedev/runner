var Block = function(tile) {
    var origin = {
	x: tile[0],
	y: tile[1]
    };
    var bounds = {
	x: tile[2],
	y: tile[3]
    };

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
