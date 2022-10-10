const { ObjectOverride,ObjProxyTable } = require('./ClassOverride');
const { TaskClient} = require("./TaskManager");

class RoomOverride extends ObjectOverride{

    constructor(orig){
        super(orig);
        //this.sourceTable = new SourceTable(this);
    }

    Update(){
        super.Update();
        //this.sourceTable.Update();
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

    Unload(){
        super.Unload();
        this.taskClient.Unload();
    }
}

class SourceOverride extends RoomObjectOver{

    constructor(orig){
        super(orig);
    }

    Update(){
        super.Update();
        console.log("source");
    }
}

class SourceTable extends ObjProxyTable{

    constructor(room){
        this.room = room;
        this.orig = super(room.orig.find(FIND_SOURCES));
    }
    
    LoadOrig(){
        this.orig = room.orig.find(FIND_SOURCES);
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