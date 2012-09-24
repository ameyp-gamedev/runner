// temporary, need to change this to an object too (probably)
var createLevel = function(gs, spec) {
    var player = null;

    var hurdles = createHurdles(gs,
				spec.hurdles,
				gs.height - spec.height);
    var floor = Floor(gs,
		      spec.hurdles[spec.hurdles.length - 1],
		      spec.height,
		      spec);
    gs.addEntity(floor);

    player = Player(gs, spec.origin, gs.height - spec.height);
    gs.addEntity(player);
    gs.launch();

    var update = function() {
	var i = 0;

	collide.aabb([player], [floor]);
	collide.aabb([player], hurdles);

	if ( spec.origin < 10200 ){
	    spec.origin += 10;
	}

	/*
	for ( i = 0; i < hurdles.length; i += 1 ) {
	    if ( hurdles[i].pos[0] < spec.origin ||
		 hurdles[i].pos[0] > spec.origin + gs.width ) {
		     gs.delEntity( hurdles[i] );
	    }
	    else {
		gs.addEntity( hurdles[i] );
	    }
	}
	 */
    };

    gs.addEntity({
	update: update
    });
};

var createHurdles = function(gs, hurdleList, height) {
    var i;
    var hurdle,
	hurdles = [];

    for (i = 0; i < hurdleList.length; i += 1) {
	hurdle = Hurdle([hurdleList[i], height]);
	gs.addEntity(hurdle);
	hurdles.push(hurdle);
    }

    return hurdles;
};
