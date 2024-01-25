const {ObjectOverride} = require('./ObjectOverride');
const {ObjProxyTable} = require('./ObjTableOverride');

class OverridedRoom extends ObjectOverride{

}

class RoomTable extends ObjProxyTable{
    constructor(){
        super(Game.rooms);
    }

    InitSingleObject(orig){
        return new OverridedRoom(orig);
    }
}

module.exports = {
    OverridedRoom,
    RoomTable,
}