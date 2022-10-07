const { ObjectOverride,ObjProxyTable } = require('./ClassOverride');
const { TaskClient} = require("./TaskManager")

class RoomOverride extends ObjectOverride{

    Update(){
        super.Update();
    }

    LoadOrig(){
        this.orig = Game.rooms[this.orig.name];
    }

    GetRandomPos(){
        var x = Math.floor(Math.random()*48+1);
        var y = Math.floor(Math.random()*48+1);
        return this.orig.getPositionAt(x,y);
    }
}

class RoomsTable extends ObjProxyTable{

    constructor(){
        super(Game.rooms);
    }
    
    LoadOrig(){
        this.orig = Game.rooms;
    }

    InitSingleObject(orig){
        return new RoomOverride(orig);
    }
}

class RoomObjectOver extends ObjectOverride{

    constructor(orig){
        super(orig);
        this.Room = roomTable.objArray[this.orig.room.name];
        this.taskClient = new TaskClient(this);
    }

    FindPath(target){
        var result = this.orig.pos.findPathTo(target);
        return result;
    }

    Update(){
        super.Update();
        this.taskClient.Update();
    }
}

const roomTable = new RoomsTable();

module.exports = {
    roomTable,
    RoomOverride,
    RoomsTable,
    RoomObjectOver,
}