const { ObjTable } = require('./ClassOverride');
const { roomTable,WithPosition } = require('./RoomsOverride');

class StructureOverride extends WithPosition{

    Update(){
        super.Update();
    }
}

class StructureTable extends ObjTable{

    constructor(){
        super(Game.structures);
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