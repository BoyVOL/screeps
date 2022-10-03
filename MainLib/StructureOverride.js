const { ObjProxyTable } = require('./ClassOverride');
const { roomTable,RoomObjectOver } = require('./RoomsOverride');

class StructureOverride extends RoomObjectOver{

    Update(){
        super.Update();
    }
}

class StructureTable extends ObjProxyTable{

    constructor(){
        super(Game.structures);
    }
    
    LoadOrig(){
        this.orig = Game.structures;
    }

    InitSingleObject(orig){
        return new StructureOverride(orig);
    }
}

const structTable = new StructureTable();

module.exports = {
    structTable,
    StructureOverride,
    StructureTable,
}