// temporary, need to change this to an object too (probably)
var createLevel = function(gs, spec) {
    var name = spec.name;
    var currentRoom = null;
    var player = null;

    var i;

    var rooms = createRooms(gs, spec.rooms);

    for (i = 0; i < rooms.length; i += 1) {
	if (rooms[i].isLevelStart()) {
	    currentRoom = rooms[i];
	    break;
	}
    }

    if (currentRoom === null) {
	throw "Unable to find level start";
    }

    currentRoom.activate(gs, null);

    player = Player(gs);
    gs.addEntity(player);
    gs.launch();

    var update = function() {
	var newRoom,
            exitPortal,
            spawnPoint;

	collide.aabb([player], currentRoom.getBlocks());
	collide.aabb([player], currentRoom.getTriggers());
	collide.aabb([player], currentRoom.getTargets());

	if (player.pos[0] < 0 ||
	    player.pos[0] > gs.width ||
	    player.pos[1] < 0 ||
	    player.pos[1] > gs.height) {

	    exitPortal = currentRoom.findPortalFromPos(player.pos[0], player.pos[1]);
	    newRoom = findRoomFromPortal(rooms, currentRoom.getName(), exitPortal);

	    newRoom.activate(gs, currentRoom);
	    spawnPoint = newRoom.findSpawnPoint(gs, player, currentRoom);
	    player.setPos(spawnPoint[0], spawnPoint[1]);
	    currentRoom = newRoom;
	    // console.log("Loaded room: " + JSON.stringify(currentRoom));
	}
    };

    gs.addEntity({
	update: update
    });
};

var createRooms = function(gs, blueprint) {
    var i;
    var room,
	rooms = [];

    for (i = 0; i < blueprint.length; i += 1) {
	room = Room(gs, blueprint[i]);
	rooms.push(room);
    }

    return rooms;
};

// works only for axis-aligned portals
var findRoomFromPortal = function(rooms, roomName, portal) {
    var i, j, destinationPortal;

    for (i = 0; i < rooms.length; i += 1) {
	if (rooms[i].getName() === portal.to) {
	    return rooms[i];
	}
    }

    throw "Unable to find room named " + portal.to;
};
