const { ObjProxyTable, ObjectOverride } = require('./ClassOverride');

class SourceOverride extends ObjectOverride{

    constructor(orig){
        super(orig);
        this.Room = roomTable.objArray[this.orig.room.name];
        this.taskClient = new TaskClient(this);
    }

    Update(){
        super.Update();
        console.log("source",this.orig.pos);
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

module.exports = {
    SourceOverride,
    SourceTable,
}