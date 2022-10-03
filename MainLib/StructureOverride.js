const { ObjTable } = require('./ClassOverride');
const { roomTable,RoomObjectOver } = require('./RoomsOverride');

class StructureOverride extends RoomObjectOver{

    Update(){
        super.Update();
    }
}

class StructureTable extends ObjTable{

    constructor(){
        super(Game.structures);
    }

    InitSingleObject(origTable,origKey){
        return new StructureOverride(origTable,origKey);
    }
}

const structTable = new StructureTable();

module.exports = {
    structTable,
    StructureOverride,
    StructureTable,
}