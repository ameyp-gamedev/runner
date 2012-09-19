var Floor = function(gs, width, height) {
    var get_collision_aabb = function() {
	return [0, gs.height - height, width, height];
    };

    return {
	get_collision_aabb: get_collision_aabb
    };
};
