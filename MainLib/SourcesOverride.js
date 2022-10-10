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