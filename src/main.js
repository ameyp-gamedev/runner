var startGame = function () {
    var gs = new JSGameSoup("surface", 30);
    var winWidth = $( "body" ).width();
    var winHeight = $( "body" ).height();

    if ( winWidth < winHeight ) {
	$( "canvas" ).width( winWidth );
	$( "canvas" ).height( winWidth );
    } else {
	$( "canvas" ).width( winHeight );
	$( "canvas" ).height( winHeight );
    }

    //$("body").addEventListener('touchmove', function(e) { e.preventDefault(); }, false);

    var levelData = {
	name: "level1",
	rooms: [
	    {
		name: "level1:room1",
		levelStart: false,
		portals: [
		    {
			to: "level1:room2",
			at: [gs.width, gs.height/3-20],
			alignment: "vertical",
			width: 40
		    },
		    {
			to: "level1:room3",
			at: [0, gs.height/1.5-20],
			alignment: "vertical",
			width: 40
		    }
		],
		triggers: [],
		targets: [],
		tiles: [
		    [0, 0, gs.width, 20],
		    [0, 0, 20, gs.height/1.5-20],
		    [0, gs.height/1.5+20, 20, gs.height/3],
		    [0, gs.height-20, gs.width, 20],
		    [gs.width-20, 0, 20, gs.height/3-20],
		    [gs.width-20, gs.height/3+20, 20, gs.height/1.5-20]
		]
	    },
	    {
		name: "level1:room2",
		levelStart: false,
		portals: [
		    {
			to: "level1:room1",
			at: [0, gs.height/1.5-20],
			alignment: "vertical",
			width: 40
		    }
		],
		triggers: [],
		targets: [],
		tiles: [
		    [0, 0, gs.width, 20],
		    [0, 0, 20, gs.height/1.5-20],
		    [0, gs.height/1.5+20, 20, gs.height/3-20],
		    [0, gs.height-20, gs.width, 20],
		    [gs.width-20, 0, 20, gs.height]
		]
	    },
	    {
		name: "level1:room3",
		levelStart: true,
		portals: [
		    {
			to: "level1:room1",
			at: [gs.width, gs.height/2-20],
			alignment: "vertical",
			width: 40
		    }
		],
		targets: [
		    {
			name: "level1:room1:entity1",
			type: "door",
			open: true,
			closedPos: [gs.width-40, gs.height/2],
			openPos: [gs.width-40, gs.height/2+60],
			sprite: {
			    anchor: ["center", "center"],
			    frames: {
				inactive: [["img/door_vertical.png", 0]]
			    },
			    default: "inactive"
			},
			scripts: [
			    {
				toggle: function() {
				    if (open) {
					pos = openPos;
					open = false;
				    }
				    else {
					pos = closedPos;
					open = true;
				    }
				}
			    }
			]
		    }
		],
		triggers: [
		    {
			name: "level1:room1:trigger1",
			pos: [gs.width-60, gs.height/3],
			type: "console",
			sprite: {
			    anchor: ["center", "center"],
			    frames: {
				active: [["img/plate_active.png", 0]],
				inactive: [["img/plate_inactive.png", 0]]
			    },
			    default: "inactive"
			},
			shoots: [
			    "level1:room1:entity1"
			]
		    }
		],
		tiles: [
		    [0, 0, gs.width, 20],
		    [0, 0, 20, gs.height],
		    [0, gs.height-20, gs.width, 20],
		    [gs.width-20, 0, 20, gs.height/2-20],
		    [gs.width-20, gs.height/2+20, 20, gs.height/2-20]
		]
	    }
	]
    };

    $.ajax({
	type: "GET",
	url: "levels/level1.tmx",
	dataType: "xml",
	success: function(xml, textStatus, jqXHR) {
	    createLevel( gs, Tiled.getLevelData(xml) );
	},
	error: function(jqXHR, textStatus, errorThrown) {
	    var xml;

	    if ( textStatus == "parsererror" ) {
		xml = $.parseXML( jqXHR.responseText );
	    } else {
		console.log("Could not load because: " + textStatus);
	    }
	}
    });

    createLevel( gs, levelData );
    loadSprites();
};

var loadSprites = function() {
    Sprite.preload([
	"img/player.png",
	"img/blocks.png",
	"img/wall.png"
    ]);
};