const { ObjectOverride,ObjTable } = require('./ClassOverride');

class RoomOverride extends ObjectOverride{

    Update(){
        super.Update();
        console.log(this.orig.name);
    }

    GetRandomPos(){
        var x = Math.floor(Math.random()*50);
        var y = Math.floor(Math.random()*50);
        return this.orig.getPositionAt(x,y);
    }
}

class RoomsTable extends ObjTable{

    constructor(){
        super(Game.rooms);
    }

    InitSingleObject(origTable,origKey){
        return new RoomOverride(origTable,origKey);
    }
}

class RoomObjectOver extends ObjectOverride{

    constructor(origTable,origKey){
        super(origTable,origKey);
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