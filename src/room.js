var Room = function(gs, roomData) {
    var blocks = createBlocks(roomData.tiles);
    var targets = createTargets(roomData.targets);
    var triggers = createTriggers(roomData.triggers, targets);

    function createBlocks(in_tiles) {
	var i;
	var blocks = [];

	for (i = 0; i < in_tiles.length; i += 1) {
	    blocks.push(Block(in_tiles[i]));
	}

	return blocks;
    }

    function createTargets(in_targets) {
	var i;
	var targets = [];

	for (i = 0; i < in_targets.length; i += 1) {
	    targets.push(Target(in_targets[i]));
	}

	return targets;
    }

    function createTriggers(in_triggers, targets) {
	var i, j, k;
	var triggers = [];

	for (i = 0; i < in_triggers.length; i += 1) {
	    in_triggers[i].targets = [];
	    for (j = 0; j < in_triggers[i].shoots.length; j += 1) {
		for (k = 0; k < targets.length; k += 1) {
		    if (in_triggers[i].shoots[j] === targets[k].get_name()) {
			in_triggers[i].targets.push(targets[k]);
		    }
		}
	    }

	    triggers.push(Trigger(in_triggers[i]));
	}

	return triggers;
    };

    var activate = function(gs, currentRoom) {
	var old_blocks = [],
            old_targets = [],
            old_triggers = [];
	var i;

	if (currentRoom !== null) {
	    old_blocks = currentRoom.getBlocks();
	    for (i = 0; i < old_blocks.length; i += 1) {
		gs.delEntity(old_blocks[i]);
	    }

	    old_triggers = currentRoom.getTriggers();
	    for (i = 0; i < old_triggers.length; i += 1) {
		gs.delEntity(old_triggers[i]);
	    }

	    old_targets = currentRoom.getTargets();
	    for (i = 0; i < old_targets.length; i += 1) {
		gs.delEntity(old_targets[i]);
	    }
	}

	for (i = 0; i < blocks.length; i += 1) {
	    gs.addEntity(blocks[i]);
	}

	for (i = 0; i < targets.length; i += 1) {
	    gs.addEntity(targets[i]);
	}

	for (i = 0; i < triggers.length; i += 1) {
	    gs.addEntity(triggers[i]);
	}
    };

    var findPortalFromPos = function(x, y) {
	var i, portal;

	for (i = 0; i < roomData.portals.length; i += 1) {
	    portal = roomData.portals[i];
	    if (portal.alignment === "horizontal") {
		if (x > portal.at[0] && x < portal.at[0] + portal.width) {
		    // pass1
		    if ((portal.at[1] === 0 && y <= portal.at[1]) ||
			(portal.at[1] === gs.height && y >= portal.at[1])) {
			return portal;
		    }
		}
	    }
	    else if (portal.alignment === "vertical") {
		if (y > portal.at[1] && y < portal.at[1] + portal.width) {
		    // pass1
		    if ((portal.at[0] === 0 && x <= portal.at[0]) ||
			(portal.at[0] === gs.width && x >= portal.at[0])) {
			return portal;
		    }
		}
	    }
	}
	throw "unable to find portal for [" + x + "," + y + "] in room " + roomData.name;
    };

    var findLinkedPortal = function(roomName, portal) {
	var i, myPortal;

	if (roomData.name !== portal.to) {
	    return null;
	}

	for (i = 0; i < roomData.portals.length; i += 1) {
	    myPortal = roomData.portals[i];

	    if (myPortal.to === roomName) {
		break;
	    }
	}

	return myPortal;
    };

    var findSpawnPoint = function(gs, player, currentRoom) {
	var i;
	var spawn = [];

	var offsetInPortal;

	var exitPortal = currentRoom.findPortalFromPos(player.pos[0], player.pos[1]);
	var entryPortal = findLinkedPortal(currentRoom.getName(), exitPortal);

	if (entryPortal.alignment === "vertical") {
	    offsetInPortal = player.pos[1] - exitPortal.at[1];

	    if (entryPortal.at[0] === 0) {
		spawn = [player.WALK_VX, entryPortal.at[1] + offsetInPortal];
	    }
	    else if (entryPortal.at[0] === gs.width) {
		spawn = [gs.width - player.WALK_VX, entryPortal.at[1] + offsetInPortal];
	    }
	}
	else if (entryPortal.alignment === "horizontal") {
	    offsetInPortal = player.pos[0] - exitPortal.at[0];

	    if (entryPortal.at[1] === 0) {
		spawn = [entryPortal.at[0] + offsetInPortal, player.WALK_VY];
	    }
	    else if (entryPortal.at[1] === gs.height) {
		spawn = [entryPortal.at[0] + offsetInPortal, gs.height - player.WALK_VY];
	    }
	}

	console.log("Spawn point found to be [" + spawn[0] + "," + spawn[1] + "]");
	return spawn;
    };

    return {
	getBlocks: function() {
	    return blocks;
	},
	getTargets: function() {
	    return targets;
	},
	getTriggers: function() {
	    return triggers;
	},
	getName: function() {
	    return roomData.name;
	},
	isLevelStart: function() {
	    return roomData.levelStart;
	},
	findPortalFromPos: findPortalFromPos,
	findLinkedPortal: findLinkedPortal,
	findSpawnPoint: findSpawnPoint,
	activate: activate
    };
};
