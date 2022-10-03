const { ObjectOverride,ObjTable } = require('./ClassOverride');

class RoomOverride extends ObjectOverride{

    Update(){
        console.log(this.orig.hits);
    }
}

class RoomsTable extends ObjTable{

    constructor(){
        super(Game.rooms);
    }

    InitSingleObject(orig){
        return new StructureOverride(orig);
    }
}

const roomTable = new RoomsTable();

module.exports = {
    roomTable,
    RoomOverride,
    RoomsTable,
}