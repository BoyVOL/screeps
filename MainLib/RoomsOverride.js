const { ObjectOverride,ObjTable } = require('./ClassOverride');

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

class RoomsTable extends ObjTable{

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
    }

    FindPath(target){
        var result = this.orig.pos.findPathTo(target);
        return result;
    }
}

const roomTable = new RoomsTable();

module.exports = {
    roomTable,
    RoomOverride,
    RoomsTable,
    RoomObjectOver,
}