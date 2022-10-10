const { ObjProxyTable } = require('./ClassOverride');
const { RoomObjectOver } = require('./RoomsOverride');

class SourceOverride extends RoomObjectOver{

    constructor(orig){
        super(orig);
    }
}

class SourceTable extends ObjProxyTable{

    constructor(room){
        this.room = room;
        super(room.orig.find(FIND_SOURCES));
    }
    
    LoadOrig(){
        super(room.orig.find(FIND_SOURCES));
    }

    InitSingleObject(orig){
        return new SourceOverride(orig);
    }
}

module.exports = {
    SourceOverride,
    SourceTable,
}