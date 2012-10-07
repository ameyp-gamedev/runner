var Floor = function(gs, width, height, spec) {
    var p = Sprite({
	anchor: [],
	section: [],
	frames: {
	    stand: [["img/background.png", [], 0]]
	},
	callback: function() {
	    p.activate("stand");
	}
    });

    var draw = function(c) {
	p.draw(c,
	       [0, 0],
	       [spec.origin, 0, gs.width, gs.height]);
    };

    var get_collision_aabb = function() {
	return [0, gs.height - height, width, height];
    };

    return {
	type: "floor",
	draw: draw,
	priority: 1,
	get_collision_aabb: get_collision_aabb
    };
};
