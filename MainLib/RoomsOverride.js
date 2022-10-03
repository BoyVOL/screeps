const { ObjectOverride,ObjTable } = require('./ClassOverride');

class RoomOverride extends ObjectOverride{

    Update(){
        super.Update();
        console.log(this.orig.name);
    }
}

class RoomsTable extends ObjTable{

    constructor(){
        super(Game.rooms);
    }

    InitSingleObject(orig){
        return new RoomOverride(orig);
    }
}

const roomTable = new RoomsTable();

module.exports = {
    roomTable,
    RoomOverride,
    RoomsTable,
}