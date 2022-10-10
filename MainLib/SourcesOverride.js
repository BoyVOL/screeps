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
        this.orig = super(room.orig.find(FIND_SOURCES));
    }
    
    LoadOrig(){
        this.orig = room.orig.find(FIND_SOURCES);
    }

    InitSingleObject(orig){
        return new SourceOverride(orig);
    }
}

module.exports = {
    SourceOverride,
    SourceTable,
}