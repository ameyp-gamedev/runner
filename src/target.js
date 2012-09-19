var Target = function(params) {
    var pos = params.open ? params.openPos : params.closedPos;
    var width = params.width;
    var p = new Sprite(params.sprite.anchor,
		       params.sprite.frames,
		       function() {
			   p.action(params.sprite.default);
		       });

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
	draw: draw
    };
};