var Trigger = function(params) {
    var pos = params.pos;
    var targets = params.targets;

    var p = new Sprite(params.sprite.anchor,
		       params.sprite.frames,
		       function() {
			   p.action(params.sprite.default);
		       });
    var active = false;

    var get_collision_aabb = function() {
	return p.aabb(pos);
    };

    var collide_aabb = function(who) {
	if (who.hasOwnProperty('is_player') &&
	    who.is_player === true) {

	    active = true;
	    p.action("active");

	    if (params.activeCallbacks) {
		for (var i = 0; i < params.activeCallbacks.length; i += 1) {
		    params.activeCallbacks[i]();
		}
	    };
	}
    };

    var no_collide_aabb = function(who) {
	if (active === true) {
	    active = false;
	    p.action("inactive");

	    if (params.inactiveCallbacks) {
		for (var i = 0; i < params.activeCallbacks.length; i += 1) {
		    params.inactiveCallbacks[i]();
		}
	    }
	}
    };

    var draw = function(c) {
	p.draw(c, pos);
    };

    return {
	get_name: function() {
	    return params.name;
	},
	get_type: function() {
	    return params.type;
	},
	draw: draw,

	// collision related
	get_collision_aabb: get_collision_aabb,
	collide_aabb: collide_aabb,
	no_collide_aabb: no_collide_aabb,
	opague: false
    };
};