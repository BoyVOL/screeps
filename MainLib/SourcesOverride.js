const { ObjProxyTable, ObjectOverride } = require('./ClassOverride');

class SourceOverride extends ObjectOverride{

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
        super(room.find(FIND_SOURCES));
    }
    
    LoadOrig(){
        this.orig = room.find(FIND_SOURCES);
    }

    InitSingleObject(orig){
        return new SourceOverride(orig);
    }
}

module.exports = {
    SourceOverride,
    SourceTable,
}