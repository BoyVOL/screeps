const { ObjectOverride,ObjProxyTable } = require('./ClassOverride');

class RoomOverride extends ObjectOverride{

    constructor(orig){
        super(orig);
        this.sourceTable = new SourceTable(this);
    }

    Update(){
        super.Update();
        this.sourceTable.Update();
    }

    LoadOrig(){
        this.orig = Game.rooms[this.orig.name];
        this.sourceTable.UpdateObjects();
    }

    GetRandomPos(){
        var x = Math.floor(Math.random()*47+1);
        var y = Math.floor(Math.random()*47+1);
        return this.orig.getPositionAt(x,y);
    }
}

class RoomsTable extends ObjProxyTable{

    constructor(){
        super(Game.rooms)
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

    GetFreeNearby(){

    }

    FindPath(target){
        var result = this.orig.pos.findPathTo(target);
        return result;
    }

    Update(){
        super.Update();
    }

    Unload(){
        super.Unload();
    }
}

class SourceOverride extends RoomObjectOver{

    constructor(orig){
        super(orig);
    }

    Update(){
        super.Update();
    }
}

class SourceTable extends ObjProxyTable{

    constructor(room){
        super(room.orig.find(FIND_SOURCES));
        this.room = room;
    }
    
    LoadOrig(){
        this.orig = this.room.orig.find(FIND_SOURCES);
    }

    InitSingleObject(orig){
        return new SourceOverride(orig);
    }
}

const roomTable = new RoomsTable();

module.exports = {
    roomTable,
    RoomOverride,
    RoomsTable,
    RoomObjectOver,
}